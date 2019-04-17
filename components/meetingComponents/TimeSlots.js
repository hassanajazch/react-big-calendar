import myConstClass from '../../services/constant'
import 'react-big-calendar/lib/less/styles.less'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.less'
import moment from 'moment';
import React, {Component} from 'react';
import NoSSR from 'react-no-ssr';
import BigCalendar from 'react-big-calendar';

const localize = BigCalendar.momentLocalizer(moment);
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import Event from '../../services/Event';
import EventTitle from "./EventTitle";
import uuid from 'uuid/v4';

import {Select} from "antd";

const Option = Select.Option;
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

class TimeSlots extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            slotStep: 1
        };
    }

    componentDidMount() {
        const event = Event.getEvents();
        console.log(event);
    }

    updateParent = (change) => {
        this.props.onChange(change);
    };

    getGoogleCalendarEvents = async (selectedCalendar) => {
        const result = await GoogleCalendar.getUserCalenderEvent(selectedCalendar);
        if (!result.error) {
            const events = result.data.map(event => {
                return (
                    {
                        id: event.id,
                        title: event.summary,
                        start: new Date(event.start.dateTime),
                        end: new Date(event.end.dateTime),
                        oldEvent: true,
                        slotAvailable: true
                    }
                )
            });
            this.setState({
                events: events
            });
            this.updateParent(events);
        }
    };

    async componentDidUpdate(prevProps) {
        if (this.props.selectedCalendar !== prevProps.selectedCalendar) {
            await this.getGoogleCalendarEvents(this.props.selectedCalendar);
            this.props.loading();
        }
    }

    checkAvailability = (newEvent) => {
        const oldEvents = this.state.events;
        const sameDayEvents = oldEvents.filter(event => moment(event.start).format("YYYY/MM/DD") === moment(newEvent.start).format("YYYY/MM/DD"));
        const timeComparison = sameDayEvents.filter(event => ((newEvent.end > event.start && newEvent.start < event.end) && event.oldEvent));

        timeComparison.length > 0 ? newEvent.slotAvailable = false : newEvent.slotAvailable = true;
        return newEvent;
    };

    handleCloseClick = (eventId) => {
        const {events} = this.state;

        const leftOvers = events.filter(existingEvent => {
            return existingEvent.id !== eventId
        });
        this.setState({
            events: leftOvers,
        });
        this.updateParent(leftOvers);
    };

    Event = ({event}) => {
        return (
            <EventTitle
                slotAvailable={event.slotAvailable}
                title={event.title}
                oldEvent={event.oldEvent}
                eventId={event.id}
                onClick={this.handleCloseClick}
            />
        )
    };


    newEvent = (event) => {
        if (moment(event.start).isBefore(moment().toDate())) {
            alert(myConstClass.Past_DAY_ERROR);
            return;
        }
        let newId = uuid();
        let hour = {
            id: newId,
            title: 'New Event',
            start: event.start,
            end: event.end,
            oldEvent: false,
        };

        const result = this.checkAvailability(hour);

        this.setState({
            events: this.state.events.concat([result]),
        });
        this.updateParent(this.state.events);
    };

    moveEvent = ({event, start, end, isAllDay: droppedOnAllDaySlot}) => {
        const {events} = this.state;
        const idx = events.indexOf(event);
        let allDay = event.allDay;

        if (!event.allDay && droppedOnAllDaySlot) {
            allDay = true
        } else if (event.allDay && !droppedOnAllDaySlot) {
            allDay = false
        }

        const updatedEvent = {...event, start, end, allDay};
        const result = this.checkAvailability(updatedEvent);

        if (moment(result.start).isBefore(moment().toDate())) {
            alert(myConstClass.Past_DAY_ERROR);
            return;
        }
        const nextEvents = [...events];

        nextEvents.splice(idx, 1, result);
        this.setState({
            events: nextEvents,
        });
        this.updateParent(nextEvents);
    };

    resizeEvent = ({event, start, end}) => {
        const {events} = this.state;
        const nextEvents = events.map(existingEvent => {
            return existingEvent.id === event.id
                ? this.checkAvailability({...existingEvent, start, end})
                : existingEvent
        });

        this.setState({
            events: nextEvents,
        });
        this.updateParent(nextEvents);

    };

    static eventStyleGetter(event) {
        let style = {
            boxShadow: 'none',
            margin: '0',
            padding: '2px 5px',
            backgroundColor: '#3174ad',
            borderRadius: '5px',
            color: '#fff',
            cursor: 'pointer',
            width: '100%',
            textAlign: 'left',
        };

        if (event.oldEvent) {

            const oldEventStyle = {
                backgroundColor: 'rgb(145, 160, 173)',
                filter: 'brightness(95%)',
                opacity: 0.7,
                border: '1px solid #86929c',
                pointerEvents: 'none',
            };
            style = {...style, ...oldEventStyle};
        }

        if (!event.slotAvailable) {
            style.backgroundColor = '#FF3333';
        }
        return {
            style: style
        };
    }

    render() {
        return (
            <NoSSR>
                <React.Fragment>
                    <div style={{paddingTop: '10px'}}>
                        <label>Default length: </label>
                        <Select defaultValue={this.state.slotStep} onChange={(value) => {
                            this.setState({slotStep: value})
                        }} style={{width: "220px", paddingBottom: '10px'}}>
                            <Option value="1">15 mins </Option>
                            <Option value="2">30 mins</Option>
                            <Option value="3">45 mins</Option>
                            <Option value="4">60 mins</Option>
                        </Select>
                    </div>
                    <DragAndDropCalendar
                        selectable
                        resizable
                        events={this.state.events}
                        step={parseInt(this.state.slotStep) * 15}
                        timeslots={4}
                        localizer={localize}
                        defaultView='week'
                        views={['week']}
                        defaultDate={moment().toDate()}
                        onEventDrop={this.moveEvent}
                        onEventResize={this.resizeEvent}
                        onSelectSlot={this.newEvent}
                        components={{
                            event: this.Event
                        }}
                        eventPropGetter={TimeSlots.eventStyleGetter}
                        selectedCalendar={this.props.selectedCalendar}
                    />
                </React.Fragment>
            </NoSSR>
        );
    }
}


export default TimeSlots

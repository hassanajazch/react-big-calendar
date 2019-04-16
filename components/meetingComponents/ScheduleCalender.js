import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {Select, Icon, Checkbox} from 'antd';
import GoogleCalenderService from "../../services/GoogleCalenderService";

const Option = Select.Option;

class ScheduleCalender extends Component {

    constructor(props) {
        super(props);
        this.state = {
            calenderList: [],
            selectedCalendar: null
        };
    }

    async updateCalenderList() {
        const calenderListRes = await GoogleCalenderService.getUserCalenders();
        const defaultCalender = calenderListRes["data"].filter(x => {
            return x.primary
        });
        this.setState({
            calenderList: calenderListRes["data"],
            selectedCalendar: defaultCalender[0].id
        });
    }

    updateParent(change) {
        this.props.onChange(change);
    }

    handleCalenderChange = (value) => {
        const change = {
            selectedCalendar: value
        };
        this.setState(change);
        this.updateParent(change);
    };

    handleGuestsCanModifyChange = (e) => {
        const change = {
            guestsCanModify: e.target.checked
        };
        this.updateParent(change);
    };

    handleDoubleBookingsChange = (e) => {
        const change = {
            preventDoubleBookings: e.target.checked
        };
        this.updateParent(change);
    };


    async componentWillMount() {
        await this.updateCalenderList();
        this.updateParent({selectedCalendar: this.state.selectedCalendar});
    }

    render() {
        const calenderOptions = [];
        this.state.calenderList.forEach(calender => {
            calenderOptions.push(<Option key={calender.id} value={calender.id}><Icon
                type="calendar"/> {calender.summary}</Option>);
        });

        return (
            <Row>
                <Col span={24}>
                    <Row type="flex" justify="start">
                        <Col span={10}>
                            <div style={{align: "center"}}><span><Icon type="schedule"/></span> Schedule On</div>
                        </Col>
                    </Row>
                    <Row type="flex" justify="start">
                        <Col span={16}>
                            <Select onChange={this.handleCalenderChange} value={this.state.selectedCalendar}
                                    id="userCalender"
                                    style={{width: 220}}>
                                {calenderOptions}
                            </Select>
                        </Col>
                    </Row>

                    <Row type="flex" justify="start">
                        <Col span={22}>
                            <Checkbox id="preventDoubleBookings" value={this.props.preventDoubleBookings}
                                      onChange={this.handleDoubleBookingsChange}>
                                Prevent double bookings on this calendar
                            </Checkbox>
                        </Col>

                    </Row>

                    <Row type="flex" justify="start">
                        <Col span={22}>
                            <Checkbox id="guestsCanModify" value={this.props.guestsCanModify}
                                      onChange={this.handleGuestsCanModifyChange}>
                                Guests can modify this event.
                            </Checkbox>
                        </Col>

                    </Row>
                </Col>
            </Row>

        );
    }
}

export default ScheduleCalender;
import React, {Component} from 'react';
import {Icon} from 'antd';

class EventTitle extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const event = this.props;

        if(event.oldEvent) {
            return (
                <div>
                    <span style={{fontSize: '14px'}}>{event.title}</span>
                </div>
            )
        }

        return (
            <div>
                <div style={{ position: "absolute", top: "-1%", right: "1%", height: "10px", width: "10px" }}>
                    <Icon style={{height: "20px", align: "right"}} type="close-circle" onClick={() => {event.onClick(event.eventId)}}/>
                </div>
                <span style={{ fontSize: '14px' }}>{ event.slotAvailable ? 'new event added' : 'unavailable' }</span>
            </div>
        );
    }
}

export default EventTitle;

import React, {Component} from 'react';
import {Row, Col, Divider, Layout} from 'antd';
const {
    Header, Footer, Sider, Content,
} = Layout;

import "../static/css/calendar.less";
import WeeklyCalendar from "../components/calendarComponents/Calendar";

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timeSlots: [],
        };
    }

    handleTimeSlots = (value) => {
        this.setState({timeSlots: value});
    };

    render() {
            return (
                <>
                    <div>
                        <Row type="flex" className="calendar-header">
                            <Col span={4} offset={10} className="header-text">React Big Calendar</Col>
                        </Row>

                        <Row>
                            <Col span={20} offset={2}   >
                                <WeeklyCalendar />
                            </Col>
                        </Row>
                    </div>
                </>
            );
    };
}

export default Calendar;
import React, {Component} from 'react';
import {Row, Col, Divider} from 'antd';

import "../static/css/meeting-page.less";
import TimeSlots from "../components/meetingComponents/TimeSlots";

class Meeting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedCalendar: null,
            selectedSlot: null,
            fieldList: [],
            timeSlots: [],
            pageLoading: true,
        };
    }

    handleScheduleOnChange = (value) => {
        this.setState(value);
    };


    handleTimeSlots = (value) => {
        this.setState({timeSlots: value});
    };

    render() {
            return (
                <Row>
                    <Row gutter={8}>
                        <Col span={4} style={{marginLeft: "20px", backgroundColor: "#e7e7eb"}}>
                            <Row>
                                <Col span={24}>
                                    <Row type="flex" justify="center" align="middle">
                                        <Col span={12}>
                                            <div>
                                                Share Availability
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>

                        <Col span={16}>
                            <TimeSlots onChange={this.handleTimeSlots} loading={this.handlePageLoading} selectedCalendar={this.state.selectedCalendar}> </TimeSlots>
                        </Col>
                    </Row>
                </Row>
            )
    }
}

export default Meeting
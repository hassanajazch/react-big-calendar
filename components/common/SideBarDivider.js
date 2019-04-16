import React, {Component} from 'react';
import {Col, Divider, Row} from 'antd';

class SideBarDivider extends Component{

    render() {
        return (
            <Row>
                <Col span={24}>
                    <Divider orientation="center"> </Divider>
                </Col>
            </Row>
        );
    }
}

export default SideBarDivider;
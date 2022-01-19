import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import MessageHeader from './MessageeHeader';


export default class Message extends Component {
    
    render() {
        return (
            <>
                <Row>
                    <Col >
                        <MessageHeader userId={this.props.userId} groupId={this.props.groupId}/>
                    </Col>
                </Row>
            </>
        )
    }
}

import React, { Component } from 'react';
import { Button, Col, Dropdown, Row } from 'react-bootstrap';

export default class ColorPanel extends Component {
    render() {
        return (
            <>
                <Row style={{height:"100vh"}}>
                    <Col style={{background:"black", color:"#fff", textAlign:"center"}} >
                        <Dropdown.Item style={{color:"#fff"}} >Color Panel</Dropdown.Item>
                        <Dropdown.Divider />
                        <Button variant="primary">Primary</Button>
                    </Col>
                </Row>
            </>
        )
    }
}

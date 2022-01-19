import React, { Component } from 'react';
import { Row,Col,Dropdown } from 'react-bootstrap';

export default class MetaPanel extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col  sm={12}>
                        <Dropdown.Menu show style={{ width:"310px", height:"100vh"}}>
                            <Dropdown.Header style={{textAlign:"center", fontSize:"20px", fontWeight:"bold"}}> <h1>Meta Panel</h1> </Dropdown.Header>
                            <Dropdown.Divider />
                                <Dropdown.Header></Dropdown.Header>
                        </Dropdown.Menu>
                    </Col>
                </Row>
            </div>
        )
    }
}

import React, { Component } from 'react';
import { Card,Dropdown } from 'react-bootstrap';

export default class MetaPanel extends Component {
    render() {
        return (
            <>
                <Card style={{height:"100vh", background:"#1F6F8B", color:"#fff"}}>
                    <h4 style={{textAlign:"center",padding:"10px"}}>Meta Panel</h4>
                    <Dropdown.Divider/>
                    <Card.Body></Card.Body>
                </Card>
            </>
        )
    }
}

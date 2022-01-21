import React, { Component } from 'react';
import { Button, Card,Dropdown } from 'react-bootstrap';

export default class ColorPanel extends Component {
    render() {
        return (
            <>
                <Card style={{height:"100vh", background:"#1F6F8B", color:"#fff"}}>
                    <h5 style={{textAlign:"center",padding:"10px"}}>Color Panel</h5>
                    <Dropdown.Divider/>
                    <Card.Body >
                        <div style={{display:"flex", justifyContent:"center"}}>
                            <Button variant="primary">Primary</Button>
                        </div>
                    </Card.Body>
                </Card>
            </>
        )
    }
}

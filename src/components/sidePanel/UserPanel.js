import React, { Component } from 'react'
import { Dropdown, Row, Col } from 'react-bootstrap';
import { getAuth,signOut  } from '../../Firebase';
import { FcOnlineSupport } from "react-icons/fc";
import Groups from './Groups';
// import Friends from './Friends'

export default class UserPanel extends Component {

    handleSignOut= ()=>{
        const auth = getAuth();
        signOut(auth).then(() => {
        console.log("Sign out")
        }).catch((error) => {
        console.log(error)
        });
    }

    render() {
        return (
            <div>
                <Row >
                    <Col >
                        <Dropdown.Menu show style={{ width:"310px", height:"100vh"}}>
                            <Dropdown.Header style={{textAlign:"center", fontSize:"20px", fontWeight:"bold"}}> <FcOnlineSupport style={{ marginRight:"10px", fontSize:"30px"}}/> IDEA CHAT</Dropdown.Header>
                            <Dropdown.Divider />
                            <Dropdown.Header>
                                <Dropdown>
                                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                                        {this.props.userName}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                        <Dropdown.Item disabled >{this.props.userName}</Dropdown.Item>
                                        <Dropdown.Item >Change Profile Picture</Dropdown.Item>
                                        <Dropdown.Item onClick={this.handleSignOut} >Sign Out</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Dropdown.Header>
                            <Dropdown.Divider />

                            {/* Groups Panel Here Start */}
                            <Groups userName={this.props.userName}/>
                            {/* Groups Panel End */}

                            <Dropdown.Divider />
                            
                            {/* Friends Panel Start */}
                            {/* <Friends/> */}
                            {/* Friends Panel End */}
                        </Dropdown.Menu>
                    </Col>
                </Row>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { Dropdown,Card,DropdownButton, SplitButton } from 'react-bootstrap';
import { getAuth,signOut  } from '../../Firebase';
import { FcOnlineSupport } from "react-icons/fc";
import Groups from './Groups';
import Friends from './Friends';

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
            <>
                <Card style={{height:"100vh", background:"#1F6F8B", color:"#fff"}}>
                    <h4 style={{textAlign:"center", padding:"10px"}}><FcOnlineSupport style={{ marginRight:"10px", fontSize:"30px", border:"2px solid #96C7C1", borderRadius:"50%"}}/>IDEA CHAT</h4>
                    <Dropdown.Divider/>
                    <Card.Body>
                    <div>

                    {['Warning'].map(
                        (variant) => (
                        <DropdownButton
                            key={variant}
                            id={`dropdown-split-variants-${variant}`}
                            variant={variant.toLowerCase()}
                            title={this.props.userName}
                        >
                            <Dropdown.Item disabled >{this.props.userName}</Dropdown.Item>
                            <Dropdown.Item >Change Profile Picture</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleSignOut} >Sign Out</Dropdown.Item>
                        </DropdownButton>
                        ),
                    )}

                    </div>
                    {/* Groups Here Start */}
                    <Groups userName={this.props.userName}/>
                    {/* Groups End */}

                    {/* Friends Here Start */}
                    <Friends user={this.props.user}/>
                    {/* Friends End */}
                    </Card.Body>
                </Card>
            </>
        )
    }
}

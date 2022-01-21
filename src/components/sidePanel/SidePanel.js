import React, { Component } from 'react';
import UserPanel from './UserPanel';


export default class SidePanel extends Component {
    render() {
        return (
            <>
                <UserPanel userName={this.props.userName} user={this.props.userName}></UserPanel>
            </>
        )
    }
}

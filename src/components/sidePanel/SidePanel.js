import React, { Component } from 'react';
import UserPanel from './UserPanel';


export default class SidePanel extends Component {
    render() {
        return (
            <div>
                <UserPanel userName={this.props.userName}></UserPanel>
            </div>
        )
    }
}

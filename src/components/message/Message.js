import React, { Component } from 'react';
import ImageModal from './ImageModal';
import MessageHeader from './MessageeHeader';


export default class Message extends Component {
    
    render() {
        return (
            <>
                <MessageHeader userId={this.props.userId} groupId={this.props.groupId}/>
            </>
        )
    }
}

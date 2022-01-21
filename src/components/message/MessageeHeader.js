import React, { Component } from 'react';
import { Card,Dropdown, InputGroup,FormControl, Button, Alert,Badge } from 'react-bootstrap';
import { getDatabase, set,push,child, ref, onChildAdded, onChildChanged, onChildRemoved } from '../../Firebase';
import { FcReading } from "react-icons/fc";
import { FaSistrix } from "react-icons/fa";
import moment from 'moment';
import ImageModal from './ImageModal';

export default class MessageeHeader extends Component {

    state={
        msg:"",
        errorMsg:"",
        groupMsg:[],
        modal:false
    }

    handleMsgChange= (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    openModal = ()=>{
        this.setState({modal:true})
    }

    handleClose =()=>{
        this.setState({modal:false})
    }

    handleMsgSubmit = ()=>{
        if(this.state.msg){

            const db = getDatabase();
            const messagePostListRef = ref(db, 'messages');
            const newMessagePostRef = push(child(messagePostListRef, `${this.props.groupId.id}`));
            set(newMessagePostRef, {
                msg: this.state.msg,
                date: Date(),
                sender: this.props.userId.uid,
                group: this.props.groupId.id,
                username:this.props.userId.displayName
            }).then(()=>{
                console.log("Message gachay")
            })

            this.setState({errorMsg:""})
        }else{
            this.setState({errorMsg:"You have no message"})
        }     
    }

    componentDidUpdate(previousProps){
        let msgArr = []
        const db = getDatabase();
        const commentsRef = ref(db, 'messages/');
        onChildAdded(commentsRef, (data) => {
            data.forEach(item=>{
                msgArr.push(item.val())
            })

            if(previousProps.groupId){
                if(previousProps.groupId.groupname !== this.props.groupId.groupname){
                    this.setState({groupMsg:msgArr})
                }
    
            }else{
                this.setState({groupMsg:msgArr})
            }

        });

        onChildChanged(commentsRef, (data) => {
            msgArr=[]
            data.forEach(item=>{
                msgArr.push(item.val())
            })

            if(previousProps.groupId){
                if(previousProps.groupId.groupname !== this.props.groupId.groupname){
                    this.setState({groupMsg:msgArr})
                }
    
            }else{
                this.setState({groupMsg:msgArr})
            }

        });
        
    }

    render() {
        const {errorMsg, idx, variant} = this.state
        return (
            <>
                <Card style={{height:"100vh", background:"#1F6F8B",color:"#fff"}}>
                    <Card.Header >
                        <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                            <h4> <FcReading style={{border:"2px solid #96C7C1", fontSize:"30px", borderRadius:"50%"}}/> Groups </h4>
                            <InputGroup style={{width:"400px"}}>
                                <InputGroup.Text id="basic-addon1"><FaSistrix/></InputGroup.Text>
                                <FormControl style={{background:"#474744", color:"#fff"}} placeholder="Search..."/>
                            </InputGroup>
                            <h4> Users (4)</h4>
                        </div>
                    </Card.Header>
                    <Card.Body style={{overflowY:"scroll",background:"#1C2B2D",color:"#fff"}}>
                        {this.state.groupMsg.map((item)=>(
                            item.group == this.props.groupId.id?

                                <div style={this.props.userId.uid == item.sender ? right:left}>
                                    <div>
                                        <h6>{item.username} <Badge bg="danger">{moment(item.date).fromNow()}</Badge></h6>
                                        <Alert key={idx} variant={variant}>
                                        <strong>{item.msg}</strong>
                                        </Alert>
                                        
                                    </div>
                                </div>
                            :
                            ""
                        ))}
                    </Card.Body>
                    <Card.Footer >
                        {/* Message Form Start */}
                        <div>
                            <Dropdown.Header show >
                                <FormControl onChange={this.handleMsgChange} name="msg" type="text" style={{width:"100%", background:"#474744", color:"#fff"}} placeholder="Aa..."/>
                            </Dropdown.Header>
                            <Dropdown.Header>
                                {/* Error Message Start */}
                                {errorMsg ? <Alert style={{ color:"red", textAlign:"center"}} key={idx} variant={variant}>
                                                {errorMsg}
                                            </Alert>: ""}
                                {/* Error Message End */}
                                <div >
                                    <Button onClick={this.handleMsgSubmit} style={{width:"49.6%",background:"#198754", fontWeight:"bold"}} variant="primary" size="sm">Send Message</Button>{' '}
                                    <Button onClick={this.openModal} style={{width:"49.6%", background:"#40514E", fontWeight:"bold"}} variant="secondary" size="sm">Send Media</Button>
                                    <ImageModal modal={this.state.modal}/>
                                </div>
                            </Dropdown.Header>
                        </div>
                        {/* Message Form End */}   
                    </Card.Footer>
                </Card>           
            </>
        )
    }
}


// Sender Style css
const right ={
    display:"flex",
    justifyContent:"flex-end"
}

const left ={
    display:"flex",
    justifyContent:"flex-start"
}

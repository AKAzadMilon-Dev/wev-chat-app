import React, { Component } from 'react';
import { Row,Col,Dropdown, InputGroup,FormControl, Button, Alert } from 'react-bootstrap';
import { getDatabase, set,push,child, ref, onChildAdded, onChildChanged, onChildRemoved } from '../../Firebase';
import { FcReading } from "react-icons/fc";
import { FaSistrix } from "react-icons/fa";

export default class MessageeHeader extends Component {

    state={
        msg:"",
        errorMsg:"",
        groupMsg:[]
    }

    handleMsgChange= (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleMsgSubmit = ()=>{
        if(this.state.msg){

            const db = getDatabase();
            const messagePostListRef = ref(db, 'messages');
            const newMessagePostRef = push(child(messagePostListRef, `${this.props.groupId.id}/${this.props.userId.uid}`));
            set(newMessagePostRef, {
                msg: this.state.msg,
                date: Date(),
                sender: this.props.userId.uid
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
        const commentsRef = ref(db, 'messages/' + this.props.groupId.id);
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
                <Row>
                    <Col>
                        <Dropdown.Menu show style={{ width:"600px"}}>
                            <Dropdown.Header style={{display:"flex", justifyContent:"space-between"}}>
                                <div>
                                    <h4> <FcReading style={{border:"2px solid #96C7C1", fontSize:"30px"}}/> Groups </h4>
                                    <h6> Users (4)</h6>
                                </div>
                                <div>
                                    <InputGroup style={{width:"400px"}} className="mb-3">
                                        <InputGroup.Text id="basic-addon1"><FaSistrix/></InputGroup.Text>
                                        <FormControl placeholder="Search..."/>
                                    </InputGroup>
                                </div>
                            </Dropdown.Header>

                            <Dropdown.Divider />
                            {/* Message Show Here Statr */}
                            <Dropdown.Header style={{height:"415px", overflowY:"scroll"}}>
                                {this.state.groupMsg.map((item)=>(
                                    <div>
                                        <span>{item.date}</span>
                                        <h4 style={this.props.userId.uid == item.sender ? right:left}>{item.msg}</h4>
                                    </div>
                                ))}
                            </Dropdown.Header>
                            {/* Message Show Here End */}

                            {/* <Dropdown.Divider /> */}
                            {/* Message Form Start */}
                            <div>
                                <Dropdown.Header show >
                                    <FormControl onChange={this.handleMsgChange} name="msg" type="text" style={{width:"100%"}} placeholder="Aa..."/>
                                </Dropdown.Header>
                                <Dropdown.Header>
                                    {/* Error Message Start */}
                                    {errorMsg ? <Alert style={{ color:"red", textAlign:"center"}} key={idx} variant={variant}>
                                                    {errorMsg}
                                                </Alert>: ""}
                                    {/* Error Message End */}
                                    <div >
                                        <Button onClick={this.handleMsgSubmit} style={{width:"49.6%"}} variant="primary" size="sm">Add Message</Button>{' '}
                                        <Button style={{width:"49.6%"}} variant="secondary" size="sm">Add Media</Button>
                                    </div>
                                </Dropdown.Header>
                            </div>
                            {/* Message Form End */}
                        </Dropdown.Menu>
                    </Col>
                </Row>
            </>
        )
    }
}


// Sender Style css
const right ={
    display:"flex",
    justifyContent:"flex-end",
    // background: "#D6E5FA",
    // display: "inline-block",
    // borderRadius: "30px",
    // padding: "10px"
}

const left ={
    display:"flex",
    justifyContent:"flex-start",
    // background: "#D1E8E4"
}

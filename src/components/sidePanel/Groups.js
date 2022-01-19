import React, { Component } from 'react';
import { Row, Col,Modal,Button,Form, Alert, Dropdown } from 'react-bootstrap';
import { FcPlus, FcAlphabeticalSortingZa } from "react-icons/fc";
import { getDatabase, ref, set,push,onValue } from '../../Firebase';
import { connect } from 'react-redux';
import {setGroup} from '../../actions'


class Groups extends Component {
    state={
        groups:[],
        modal:false,
        groupname:"",
        grouptagline:"",
        error:"",
        firstLoad:true,
        active:""
    }

    openModal = ()=>{
        this.setState({modal:true})
    }

    handleClose =()=>{
        this.setState({modal:false})
    }

    handleChange= (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        if(this.isFormValid(this.state)){
            // Create a new post reference with an auto-generated id
            const db = getDatabase();
            const groupPostListRef = ref(db, 'groups');
            const newGroupPostRef = push(groupPostListRef);
            set(newGroupPostRef, {
                groupname: this.state.groupname,
                grouptagline: this.state.grouptagline,
                createdBy: this.props.userName
            }).then(()=>{
                this.setState({modal:false})
                this.setState({groupname: ""})
                this.setState({grouptagline: ""})
                this.setState({error: ""})
            })
        }else{
            this.setState({error:"Please Fill in the box"})
        }
    }

    isFormValid = ({groupname, grouptagline})=>{
        if(groupname && grouptagline){
            return true
        }else{
            return false
        }
    }

    // Read data... data home page a show korar jonno babohar korahoy.
    componentDidMount(){
        const groupsAfterLoad =[]
        const db = getDatabase();
        const groupPostListRef = ref(db, 'groups' );
        onValue(groupPostListRef, (snapshot) => {
            snapshot.forEach(item=>{
                console.log(item.key)
                const groupData ={
                    id: item.key,
                    groupname: item.val().groupname,
                    grouptagline: item.val().grouptagline,
                    createdBy: item.val().createdBy
                }
                groupsAfterLoad.push(groupData)
                
            })
            this.setState({groups: groupsAfterLoad}, this.addGroupOnLoad);
        });
    }

    groupChange = (group)=>{
        this.setState({active: group.id})
        this.props.setGroup(group)
    }

    addGroupOnLoad = ()=>{
        const firstGroup = this.state.groups[0]
        if(this.state.firstLoad && this.state.groups.length > 0){
            this.props.setGroup(firstGroup)
            this.setState({active:firstGroup.id})
        }
        this.setState({firstLoad:false})
    }

    render() {
        const {groups,idx,variant,error,groupname,grouptagline} = this.state
        return (
            <>
                <Row>
                    <Col>
                        <Dropdown.Header style={{ fontSize:"14px", fontWeight:"bold"}}>
                            Groups ({groups.length})
                            <FcPlus onClick={this.openModal} style={{fontSize:"30px", marginLeft:"160px"}}/>
                        </Dropdown.Header>
                        <div style={{marginTop:"10px", color:"black"}}>
                            {this.state.groups.map((item)=>(
                                <Dropdown.Header onClick={()=>this.groupChange(item)} style={{color:"#fff", fontSize:"14px"}} style={item.id == this.state.active ? menuListActiove:menuList}>{item.groupname}</Dropdown.Header>
                            ))}
                        </div>
                    </Col>

                    <Modal show={this.state.modal} onHide={false}>
                        <Modal.Header>
                            <Modal.Title><FcAlphabeticalSortingZa style={{marginRight:"20px", marginLeft:"110px", background:"#FFA400"}}/>Add Groups Details</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.handleSubmit}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Group Name</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="groupname" type="email" placeholder="Group Name" value={groupname} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Group Tagline</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="grouptagline" type="text" placeholder="Group Tagline" value={grouptagline} />
                                </Form.Group>
                            </Form>
                            {/* Error Message Start */}
                            {error ? <Alert style={{ color:"red"}} key={idx} variant={variant}>
                                {error}
                            </Alert>: ""}
                            {/* Error Message End */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                            <Button variant="primary" onClick={this.handleSubmit}>Add Group</Button>
                        </Modal.Footer>
                    </Modal>
                </Row>
            </>
        )
    }
}

const menuList ={
    color: "black",
    fontSize: "16px",
    paddingLeft: "20px"
}
const menuListActiove ={
    color: "black",
    paddingLeft: "20px",
    background: "#D9D7F1",
    fontSize: "16px",
}

export default connect(null,{setGroup}) (Groups)

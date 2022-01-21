import React, { Component } from 'react';
import { Modal,Button,Form, Alert, Dropdown } from 'react-bootstrap';
import { FcPlus, FcAlphabeticalSortingZa } from "react-icons/fc";

export default class ImageModal extends Component {

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
        
    }

  render() {
    return (
        <div>
            {/* Modal */}
            <Modal show={this.props.modal} onHide={false}>
                <Modal.Header>
                    <Modal.Title><FcAlphabeticalSortingZa style={{marginRight:"20px", marginLeft:"110px", background:"#FFA400"}}/>Add Groups Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Group Name</Form.Label>
                            <Form.Control onChange={this.handleChange} name="groupname" type="email" placeholder="Group Name"  />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Group Tagline</Form.Label>
                            <Form.Control onChange={this.handleChange} name="grouptagline" type="text" placeholder="Group Tagline"  />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                    <Button variant="primary" onClick={this.handleSubmit}>Add Group</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
  }
}

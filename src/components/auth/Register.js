import React, { Component } from 'react';
import { Col, Row, Form, Button, Alert, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {getAuth, createUserWithEmailAndPassword, updateProfile, getDatabase, ref, set } from '../../Firebase';

export default class Register extends Component {

    state={
        name:"",
        email:"",
        password:"",
        conformPassword:"",
        errorMsg:"",
        successMsg:""

    }

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    // form validation
    isFormEmpty = ({name,email,password,conformPassword})=>{
        if(!name.length || !email.length || !password.length || !conformPassword.length){
            this.setState({errorMsg: "Please fill in the all filed first."})
        }else if(password.length < 8 || conformPassword.length <8){
            this.setState({errorMsg: "Your password must be 8 charecters."})
        }else if(password.length !== conformPassword.length){
            this.setState({errorMsg: "Your conform password dose not matched."})
        }else{
            return true
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        if(this.isFormEmpty(this.state)){
            createUserWithEmailAndPassword(getAuth(), this.state.email, this.state.password)
            .then((userCredential) => {
                console.log(userCredential.user.uid)
                updateProfile(getAuth().currentUser, {
                    displayName: this.state.name
                }).then(()=>{
                    this.writeUserData(userCredential)
                }).then(()=>{
                    this.setState({ name: ""})
                    this.setState({ email: ""})
                    this.setState({ password: ""})
                    this.setState({ conformPassword: ""})
                    this.setState({ errorMsg: ""})
                    this.setState({ successMsg: "Account Create Successfully."})
                }).catch((error)=>{
                    const errorCode = error.code;
                    if(errorCode){
                        this.setState({errorMsg:"User name not valid"})
                    }
                })
            }).catch((error) => {
                const errorCode = error.code;
                if(errorCode.includes("email")){
                    this.setState({errorMsg:"This Email already in use."})
                }
            })
        } 
    }

    // firebase realtime database
    writeUserData = (user)=> {
        const db = getDatabase();
        set(ref(db, 'users/' + user.user.uid), {
            username: this.state.name
        });
    }

    render() {
        const {name,email,password,conformPassword,errorMsg,successMsg, idx,variant} = this.state
        return (
            <>
                <div>
                    <div style={{textAlign:"center", marginTop:"20px"}}>
                        <h1 >Register Form</h1>
                        <h4 >Create An Account</h4>
                    </div>
                    <Row style={{ marginTop:"10px"}}>
                        <Col md={4}>
                            <Image fluid style={{marginTop:"20px"}} src="images/5.png"/>
                        </Col>
                        <Col md={4} >
                        <div style={{textAlign:"center"}}>
                            {/* Error Message Start */}
                            {errorMsg ? <Alert style={{ color:"red"}} key={idx} variant={variant}>
                                {errorMsg}
                            </Alert>: ""}
                            {/* Error Message End */}
                            {/* Success Message Start */}
                            {successMsg ? <Alert style={{ color:"green"}} key={idx} variant={variant}>
                                {successMsg}
                            </Alert>: ""}
                            {/* Success Message End */}
                        </div>
                            <Form style={{marginTop:"20px", border:"3px solid #E6E6E6", padding:"15px"}}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="name" type="name" placeholder="Full Name" value={name}/>
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="email" type="email" placeholder="Enter email" value={email} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Password" value={password} />
                                </Form.Group>
                                {this.state.errorMsg.includes("password")? this.state.errorMsg : ""}
                                <Form.Group className="mb-3" >
                                    <Form.Label>Conform Password</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="conformPassword" type="password" placeholder="Conform Password" value={conformPassword}/>
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button onClick={this.handleSubmit} variant="primary">
                                        Sign In
                                    </Button>
                                </div>
                                <div style={{marginTop:"15px", textAlign:"center"}}>
                                    <Alert>
                                    <h6>Already Have An Account ? <Link to="/login">Log In</Link> </h6>
                                    </Alert>
                                </div>
                            </Form>
                        </Col>
                        <Col  md={4}>
                            <Image fluid style={{marginTop:"20px"}} src="images/4.png"/>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

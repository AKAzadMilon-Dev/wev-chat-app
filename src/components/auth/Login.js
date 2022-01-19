import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Form, Button, Alert, Image } from 'react-bootstrap';
import {getAuth, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup,FacebookAuthProvider } from '../../Firebase';

export default class Login extends Component {

    state={
        email: "",
        password: "",
        errorMsg: ""
    }

    handleChange = (e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    // Form Validation
    isFormEmpty = ({email,password})=>{
        if(!email.length || !password.length){
            this.setState({errorMsg: "Fill in the all filed first. "})
        }else if(password.length < 8){
            this.setState({errorMsg: "Your password must be 8 charecters."})
        }else{
            return true
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault()
        if(this.isFormEmpty(this.state)){
            signInWithEmailAndPassword(getAuth(), this.state.email, this.state.password)
            .then((userCredential)=>{
                console.log(userCredential)
            }).catch((error) => {
                const errorCode = error.code;
                if(errorCode.includes("user")){
                    this.setState({errorMsg: "email Not Matched"})
                }else if(errorCode.includes("wrong-password")){
                    this.setState({errorMsg: "Wrong Password"})
                }
            });
            
        } 
    }

    // Google Sign In
    handleGoogleSubmit = ()=>{
        const provider = new GoogleAuthProvider()
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
        });
    }

    // Facebook Login
    handleFacebookSubmit = ()=>{
        const provider = new FacebookAuthProvider();
        const auth = getAuth();
        signInWithPopup(auth, provider)
        .then((result) => {
            // The signed-in user info.
            const user = result.user;

            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            const credential = FacebookAuthProvider.credentialFromResult(result);
            const accessToken = credential.accessToken;

            // ...
        })
        .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = FacebookAuthProvider.credentialFromError(error);

            // ...
        });
    }

    render() {
        const {email,password,errorMsg,idx,variant} = this.state
        return (
            <>
                <div>
                    <div style={{textAlign:"center", marginTop:"50px"}}>
                        <h1 >Login</h1>
                    </div>
                    <Row >
                        <Col md={4}>
                            <Image fluid style={{marginTop:"20px"}} src="images/5.png"/>
                        </Col>
                        <Col md={4} style={{marginTop:"30px"}}>
                            <div style={{textAlign:"center"}}>
                                {/* Error Message Start */}
                                {errorMsg ? <Alert style={{ color:"red"}} key={idx} variant={variant}>
                                    {errorMsg}
                                </Alert>: ""}
                                {/* Error Message End */}
                            </div>
                            <Form style={{marginTop:"60px", border:"3px solid #E6E6E6", padding:"15px"}}>
                            {this.state.errorMsg.includes("email")? this.state.errorMsg : ""}    
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control onChange={this.handleChange}  name="email" type="email" placeholder="Enter email" value={email} />
                                </Form.Group>
                                {/* {this.state.errorMsg.includes("password")? this.state.errorMsg : ""} */}
                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control onChange={this.handleChange} name="password" type="password" placeholder="Password" value={password} />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button onClick={this.handleSubmit} variant="primary">
                                        Log In
                                    </Button>
                                </div>
                                
                                <div style={{marginTop:"15px", textAlign:"center"}}>
                                    <Alert>
                                    <h6>Don't Have An Account ? <Link to="/register">Sign In</Link> </h6>
                                    </Alert>

                                    <div style={{marginTop:"15px", textAlign:"center", display:"flex", justifyContent:"space-between"}}>
                                    <Button onClick={this.handleGoogleSubmit} variant="success">Sign in With Google</Button>
                                    <Button onClick={this.handleFacebookSubmit} variant="success">Sign In With Facebook</Button>
                                    </div>
                                </div>
                            </Form>
                        </Col>
                        <Col  md={4}>
                            <Image fluid style={{marginTop:"20px"}}  src="images/4.png"/>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

import React, { Component } from 'react';
import { getAuth } from '../Firebase';
import { setUser,clearUser } from '../actions';
import {connect} from 'react-redux';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import ColorPanel from './colorPanel/ColorPanel';
import SidePanel from './sidePanel/SidePanel';
import Message from './message/Message';
import MetaPanel from './metaPanel/MetaPanel';




class App extends Component {

  componentDidMount(){
    console.log(this.props.isLoading)
    getAuth().onAuthStateChanged((user)=>{
      if(user){
        this.props.setUser(user)
      }else{
        this.props.clearUser()
      }
    })
  }

  render() {
    return this.props.isLoading ?
    <div style={{textAlign:"center", paddingTop:"300px", background:"#0C1215", height:"100vh", color:"#fff"}}>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
    :
    (
      <>
        <div style={{background:"#1F6F8B"}}>
          <Container fluid >
            <Row>
              <Col  md={1}>
                <ColorPanel></ColorPanel>
              </Col>
              <Col  md={2}>
                <SidePanel userName={this.props.userName.displayName} user={this.props.userName}></SidePanel>
              </Col>
              <Col  md={7}>
                <Message userId={this.props.userName} groupId={this.props.groupId}></Message>
              </Col>
              <Col md={2}>
                <MetaPanel></MetaPanel>
              </Col>
            </Row>
          </Container>
        </div>
      </>
    )
  }
}

// connect ar maddomay "mapStateToProps" use koray data nia asa.
const mapStateToProps = (state)=>({
  isLoading: state.user.isLoading,
  userName: state.user.currentUser,
  groupId:state.group.currentgroup
})
// =============== End ======================

export default connect(mapStateToProps , {setUser,clearUser})(App);
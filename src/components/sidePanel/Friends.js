import React, { Component } from 'react';
import { getDatabase,onChildAdded,ref,onValue,push,set,onDisconnect,onChildRemoved,remove  } from '../../Firebase';
import { Dropdown } from 'react-bootstrap';
import { FaUsers,FaUser } from "react-icons/fa";

export default class Friends extends Component {

    state={
        user:this.props.user,
        users:[],
        alert:false
    }

    componentDidMount(){
        if(this.state.user){
            this.addEventListeners(this.state.user)
        }
    }

    addEventListeners = (currentUser)=>{
        let loadedUsers = []
        const db = getDatabase();
        const usersRef = ref(db,'users/');
        const connectRef = ref(db, '.info/connected');
        const presentRef = ref(db, 'present/' +currentUser.uid);
        const presentRefTwo = ref(db, 'present/');

        onChildAdded(usersRef, (snapshot)=>{
            let user = snapshot.val()
            user['uid'] = snapshot.key
            user['states'] = 'offline'
            loadedUsers.push(user)
            this.setState({users:loadedUsers})
        })

        onValue(connectRef, (snapshot)=>{
            if(snapshot.val() === true){
                set(presentRef, {
                    username: currentUser.displayName,
                    status:true
                })
                
                onDisconnect(presentRef).remove(error=>{
                    if(error !== null){
                        console.log("error achay", error)
                    }
                })
            }
        })

        onChildAdded(presentRefTwo, (snapshot)=>{
            this.addUserStatus(snapshot.key, true)
        })

        onChildRemoved(presentRefTwo, (snapshot)=>{
            this.addUserStatus(snapshot.key, false)
        })
    }

    addUserStatus = (userid, connected)=>{
        let updateUser = this.state.users.reduce((initialvalue, user)=>{
            if(user.uid === userid){
                user['status'] = `${connected ? 'online':'offline'}`
            }
            initialvalue.push(user)
            return initialvalue
        },[])
        this.setState({users:updateUser})
    }

  render() {
      
    return (
        <>
            <Dropdown.Header style={{ fontSize:"18px",color:"#fff", fontWeight:"bold", display:"flex", justifyContent:"space-between"}}>
                Friends ({this.state.users.length})
                <FaUsers  style={{fontSize:"25px" }}/>
            </Dropdown.Header>
            <div style={{marginTop:"10px", color:"black", cursor:"pointer"}}>
                {this.state.users.map((item)=>(
                    <Dropdown.Header style={{color:"#fff", fontSize:"14px"}}><FaUser style={{border:"2px solid black", borderRadius:"50%", fontSize:"20px"}}/> {item.username}--{item.status}</Dropdown.Header>
                ))}
            </div>
        </>
    )
  }
}

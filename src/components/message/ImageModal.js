import { getDownloadURL, uploadBytesResumable,ref } from 'firebase/storage';
import React, { Component } from 'react';
import { Modal,Button,Form,ProgressBar } from 'react-bootstrap';
import { FcAlphabeticalSortingZa } from "react-icons/fc";
import { storage, push, getDatabase, set, child, ref as refer } from '../../Firebase';

export default class ImageModal extends Component {
    
    state={
        file:"",
        progress: ""
    }

    handleImage = (e)=>{
        this.setState({file:e.target.files[0]})
    }

    handleUpload = ()=>{
        if(this.state.file){
            const storageRef = ref(storage, `files/${this.state.file.name}`)
            const uploaadTask = uploadBytesResumable(storageRef, this.state.file)
            uploaadTask.on("state_changed", (snapshot)=>{
                const progresses = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({progress:progresses})
            },(err)=>{
                console.log(err)
            },()=>{
                getDownloadURL(uploaadTask.snapshot.ref).then((url)=>{
                    console.log(url)
                    const db = getDatabase();
                    const postGroupRef = refer(db, 'files');
                    const newGroupRef = push(child(postGroupRef, `${this.props.groupid.id}`));
                    set(newGroupRef, {
                        fileurl: url,
                        date: Date(),
                        sender: this.props.userid.uid,
                        group:this.props.groupid.id,
                        username:this.props.userid.displayName
                    }).then(()=>{
                        this.props.close()
                        this.setState({progress:""})
                    }).catch(err=>{
                        console.log("ami")
                    })
                }).catch(err=>{
                    console.log("error achay", err)
                })
            })
        }else{
            console.log("File Nai")
        }
    }

render() {
    return (
        <>
            {/* Modal */}
            <Modal show={this.props.modal} onHide={false}>
                <Modal.Header>
                    <Modal.Title><FcAlphabeticalSortingZa style={{marginRight:"20px", marginLeft:"110px", background:"#FFA400"}}/>Add Media</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group className="mb-3" >
                            <Form.Label>Upload Media</Form.Label>
                            <Form.Control onChange={this.handleImage} type="file" placeholder="Upload Image"  />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                {this.state.progress ?
                
                <ProgressBar animated now={this.state.progress} />
                :
                ""
                }
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>Cancel</Button>
                    <Button onClick={this.handleUpload} variant="primary">Upload</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
  }
}

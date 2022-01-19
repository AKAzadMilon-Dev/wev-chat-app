import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router,Route, Routes, Navigate} from "react-router-dom";
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {getAuth} from './Firebase';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';


const store = createStore (rootReducer,composeWithDevTools())

class Routing extends Component{

  state={
    tracker: false
  }
  // User Login obosthay achay kina  chack kora
  componentDidMount(){
    getAuth().onAuthStateChanged((user)=>{
      if(user){
        this.setState({tracker:true})
      }else{
        this.setState({tracker:false})
      }
    })
  }
  render(){
    return(
      <Router>
        {this.state.tracker ?
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path="/register" element={<Navigate to="/"/>} />
          <Route path="/login" element={<Navigate to="/"/>} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
        </Routes>
        }
        
      </Router>
    )
  }
}

ReactDOM.render(<Provider store={store}><Routing/></Provider>,document.getElementById('root'));


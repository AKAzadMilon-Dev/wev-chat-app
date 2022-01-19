import { combineReducers } from 'redux'
import * as actiontype from '../actions/type'


const initialstate = {
    currentUser: null,
    isLoading: true
}

const userReducer = (state = initialstate, action)=>{
    switch(action.type){
        case actiontype.SET_USER:
            return{
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        
        case actiontype.CLEAR_USER:
            return{
                ...initialstate
            }
        default:
            return state
    }
}

const initialStateGroup = {
    currentgroup: null
}

const groupReducer = (state = initialStateGroup, action)=>{
    switch (action.type) {
        case actiontype.SET_CURRENT_GROUP:
            
            return{
                ...state,
                currentgroup: action.payload.currentGroup
            }
    
        default:
            return state
    }
}

const rootReducer = combineReducers({
    user: userReducer,
    group: groupReducer
})

export default rootReducer;
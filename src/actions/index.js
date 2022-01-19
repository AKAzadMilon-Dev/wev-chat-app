import * as actiontype from './type';

export const setUser = (user)=>{
    return{
        type: actiontype.SET_USER,
        payload:{
            currentUser: user
        }
    }
}

export const clearUser = ()=>{
    return{
        type: actiontype.CLEAR_USER,
    }
}

export const setGroup = (group)=>{
    return{
        type: actiontype.SET_CURRENT_GROUP,
        payload:{
            currentGroup: group
        }
    }
}
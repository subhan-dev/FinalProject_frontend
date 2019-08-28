import { combineReducers } from "redux";

const init = {
    id: "",
    username: "",
    isAdmin: false
}

const userReducer = (state = init, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                id: action.payload.id,
                username: action.payload.username,
                isAdmin: action.payload.isAdmin
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                id: '',
                username:'',
                isAdmin: false
            }
        default:
            return state
    }   
}

export default combineReducers(
    {
        auth: userReducer,
    }
)
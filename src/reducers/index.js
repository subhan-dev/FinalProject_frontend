import { combineReducers } from "redux";

const init = {
    id: "",
    username: "",
    isAdmin: false
}

const initCart = {
    arrCarts: []
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

const userCarts = (state = initCart, action) => {
    switch(action.type) {
        case 'GET_CARTS':
            return {
                arrCarts: action.payload
            }
        default:
            return state
}
}

export default combineReducers(
    {
        auth: userReducer,
        carts: userCarts
    }
)
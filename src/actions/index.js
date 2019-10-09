import axios from '../config/axios';
import cookies from 'universal-cookie';
import Swal from 'sweetalert2'

const cookie = new cookies()

export const onLogin = (user) => {
    return async (dispatch) => {
        try {
            const res = await axios.post('/login-user', user)
            if(typeof(res.data) == 'string') {
                Swal.fire({
                    type: 'error',
                    text: res.data
                })
            } else {
                console.log(res.data)
                cookie.set('user', {id: res.data.id, username: res.data.username, isAdmin: res.data.isAdmin}, {path: '/'})
                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res.data
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}

export const keepLogin = (userCookie) => {
    return {
        type:'LOGIN_SUCCESS',
        payload: {
            id: userCookie.id,
            username: userCookie.username,
            isAdmin: userCookie.isAdmin
        }
    }
}

export const onLogout = () =>{
    cookie.remove('user')
    return {
        type:'LOGOUT_SUCCESS'
    }
}

export const getCart = (user_id) => {
    return (dispatch) => {
        axios.get(`/get-carts-length/${user_id}`).then(res => {
            dispatch({
                type: 'GET_CARTS',
                payload: res.data
            })
        })
    }
}
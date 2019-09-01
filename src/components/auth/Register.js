import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from '../../config/axios'
import Swal from 'sweetalert2'

import './Register.css'
import { async } from 'q';

class Register extends Component {

    state = {
        user: {
            fullname: '',
            username: '',
            email: '',
            password: ''
        },
        successRegis: false
    }

    handleChange = (event) => {
        this.setState({
            user: {
                ...this.state.user,
                [event.target.name]: event.target.value
            }
        })
    }

    handleSubmit = async () => {
        const { user, successRegis } = this.state
        if(user.fullname && user.username && user.email && user.password) {

            console.log(user)
            try {
                const resGet = await axios.get(`/gett-users/${user.username}/${user.email}`)
                if(resGet.data.length > 0) {
                    Swal.fire({
                        type: 'error',
                        text: 'Email or username has been taken'
                    })
                } else {
                    try {
                        const resPost = await axios.post('/register-user', user)
                        if(typeof(resPost.data) == 'string') {
                            Swal.fire({
                                type: 'error',
                                text: resPost.data
                            })
                        } else {
                            this.setState({successRegis: true})
                            console.log(resPost)
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }

            } catch (error) {
                console.log(error)
            }
        }         
    }

    render() {

        const { user, submitted, messageRegis, successRegis } = this.state;
        if(successRegis) return <Redirect to='/login'></Redirect>
        return (
            <div className="mt-5 row">
                <div className="col-md-3 mx-auto card">
                    <div className="card-body">
                        <div className="border-bottom border-secondary card-title">
                            <h3 className="text-center">
                                REGISTER
                            </h3>
                        </div>
                        <div className="card-title mt-4">
                            <p className="mb-0">FULLNAME</p>
                            <form className="input-group">
                                <input className="form-control form-control-sm" type="text" name="fullname" value={user.fullname} onChange={this.handleChange}/>
                            </form>
                        </div>
                        <div className="card-title mt-2">
                            <p className="mb-0">USERNAME</p>
                            <form className="input-group">
                                <input className="form-control form-control-sm" type="text" name="username" value={user.username} onChange={this.handleChange}/>
                            </form>
                        </div>
                        <div className="card-title mt-2">
                            <p className="mb-0">EMAIL</p>
                            <form className="input-group">
                                <input className="form-control form-control-sm" type="mail" name="email" value={user.email} onChange={this.handleChange}/>
                            </form>
                        </div>
                        <div className="card-title mt-2">
                            <p className="mb-0">PASSWORD</p>
                            <form className="input-group">
                                <input className="form-control form-control-sm" type="password" name="password" value={user.password} onChange={this.handleChange}/>
                            </form>
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn btn-dark btn-block" onClick={this.handleSubmit}>REGISTER</button>
                        </div>
                        <div className="mt-3 text-center">
                            <p>LOGIN <Link to="/register" className="text-dark">HERE</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Register

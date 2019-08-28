import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import './Login.css'

import { onLogin } from '../../actions/index'


class Login extends Component {
    
    state = {
        user: {
            email: '',
            password: ''
        },
        loginSuccess: false
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
        const {user, loginSuccess} = this.state
        if(user.email && user.password) {
            this.props.onLogin(user)
        }
    }

    render() {
        
        if(this.props.user.username !== '') return <Redirect to='/' />
        return (
            <div className="mt-5 row">
                <div className="col-md-3 mx-auto card">
                    <div className="card-body ">
                        <div className="border-bottom border-secondary card-title">
                            <h3 className="text-center">
                                LOGIN
                            </h3>
                        </div>
                        <div className="card-title mt-4">
                            <p className="mb-0">EMAIL*</p>
                            <form className="input-group">
                                <input className="form-control form-control-sm" type="text" name="email" onChange={this.handleChange}/>
                            </form>
                        </div>
                        <div className="card-title mt-2">
                            <p className="mb-0">PASSWORD*</p>
                            <form className="input-group">
                                <input className="form-control form-control-sm" type="password" name="password" onChange={this.handleChange}/>
                            </form>
                        </div>
                        <div className="text-center mt-4">
                            <button className="btn btn-dark btn-block" onClick={this.handleSubmit}>LOGIN</button>
                        </div>
                        <div className="mt-3 text-center">
                            <p>REGISTER <Link to="/register" className="text-dark">HERE</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) =>{
    return{
        user : state.auth
    }
}

export default connect(mapStateToProps, { onLogin })(Login)

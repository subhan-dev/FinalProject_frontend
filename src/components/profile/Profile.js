import React, { Component } from 'react'
import {connect} from 'react-redux'
import axios from '../../config/axios';
import {Redirect} from 'react-router-dom'
import profile from './default.jpg'


class Profile extends Component {
    state = {
        user: {},
        edit: false
    }
    getUser = async () => {
        try {
            const res = await axios.get(`/users/${this.props.user.id}`)
            // console.log(res.data)
            this.setState({user: res.data[0]})
        } catch (error) {
            console.log(console.log(error))
        }
    }
    componentDidMount() {
        // console.log(this.props.user.id)
        this.getUser()
    }
    handleEdit = async () => {
        const formData = new FormData()
        formData.append('fullname', this.newName.value)
        formData.append('email', this.newEmail.value)
        formData.append('avatar', this.image.files[0])
        try {
            const res = await axios.patch(`/users/profile/${this.props.user.id}`, formData)
            console.log(res)
            await this.getUser()
            this.setState({edit: false})
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        const {user, edit} = this.state
        // console.log(user)
        if(this.props.user.username && !this.props.user.isAdmin) {
            return (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-4">
                            <div className="card" style={{width: '280px'}}>
                                {/* <img className="card-img-top" src={`http://localhost:2019/users/avatar/${user.avatar}`} alt="Card image cap" /> */}
                                {
                                    !user.avatar ? <img className="card-img-top" src={profile} alt="Card image cap" /> : <img className="card-img-top" src={`http://localhost:2019/users/avatar/${user.avatar}`} alt="Card image cap" />
                                }
                                <div className="card-body">
                                    <h5 className="card-title">@{user.username}</h5>
                                    {edit && <input type="file" class="form-control-file" ref={(input) => this.image = input}/>}
                                </div>
                            </div>
                        </div>
                        <div className="col-2">
                        <div class="card" style={{width: '18rem'}}>
                            
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">Name</li>
                                <li class="list-group-item">Username</li>
                                <li class="list-group-item">Email</li>
                            </ul>
                        </div>
                        {!edit ? <button className="btn btn-primary mt-4" onClick={() => this.setState({edit: true})}>Edit Profile</button> :
                            <div>
                                <button className="btn btn-success mt-4" onClick={this.handleEdit}>Save</button>
                                <button className="btn btn-warning mt-4" onClick={() => this.setState({edit: false})}>Cancel</button>
                            </div>
                        }
                        </div>
                        <div className="col-4">
                        <div class="card" style={{width: '18rem'}}>
                            
                            <ul class="list-group list-group-flush">
                                {edit ? <li class="list-group-item"><input type="text" className="form-control form-control-sm" defaultValue={user.fullname} ref={(input) => this.newName = input}></input></li> : <li class="list-group-item">{user.fullname}</li>}
                                
                                <li class="list-group-item">{user.username}</li>
                                {edit ? <li class="list-group-item"><input type="text" className="form-control form-control-sm" defaultValue={user.email} ref={(input) => this.newEmail = input}></input></li> : <li class="list-group-item">{user.email}</li>}
                            </ul>
                        </div>
                        </div>
                    </div>
                </div>
            )
        }
        return <Redirect to="/login"></Redirect>
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(Profile)

import React, { Component } from 'react'
import axios from '../../config/axios';
import {connect} from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import {getCart} from '../../actions/index'

class Cart extends Component {

    state = {
        carts: [],
        total: 0
    }

    getCart = async () => {
        try {
            const res = await axios.get(`/get-carts/${this.props.user.id}`)
            // console.log(res.data)
            this.setState({carts: res.data})
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getCart()
        // this.renderTotal()
    }

    handleDeleteCart = async (id) => {
        // console.log(id)
        const res = await axios.delete(`/carts-del/${id}`)
        // console.log(res.data)
        this.props.getCart(this.props.user.id)
        this.getCart()
    }

    renderCart = () => {
        return this.state.carts.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.size_name}</td>
                    <td>Rp {item.price.toLocaleString('IN')}</td>
                    <td>{item.quantity}</td>
                    <td>Rp {(item.quantity * item.price).toLocaleString('IN')}</td>
                    <td>
                        <button className="btn btn-danger" onClick={() => this.handleDeleteCart(item.id)}>Deleted</button>
                    </td>
                </tr>
            )
        })
    }

    renderTotal = () => {
        let totalCart = 0
        this.state.carts.forEach(item => {
            totalCart += (item.price * item.quantity)
        })

        return totalCart
    }

    render() {
        if(!this.props.user.username) return <Redirect to='/login'></Redirect>
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-8">
                        <table className="table table-hover mb-5 mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Size</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                        </table>
                    </div>
                    <div className="card col-4" style={{border:'none'}}>
                        <div className="card-body">
                            <h2 className="card-title">Cart Total</h2>
                            <hr/>
                            <div className="mt-3">
                                <div className="d-inline-block mr-4">
                                    <h5>Total</h5>
                                </div>
                                <div className="d-inline-block ml-5">
                                    <h5>Rp {this.renderTotal().toLocaleString('IN')}</h5>
                                </div>
                            </div>
                            <hr/>
                            
                            
                            {/* <select className="custom-select mt-5">
                                <option>Choose your option</option>
                                <option value="1">Option 1</option>
                                <option value="2">Option 2</option>
                                <option value="3">Option 3</option>
                            </select> */}
                            {/* <h5 className="mt-4">Stock</h5> */}
                            {/* <button type="button" className="btn btn-dark btn-sm">+</button>
                            <input type="text" style={{width: '50px'}} className="text-center" value="1"></input>
                            <button type="button" className="btn btn-dark btn-sm">-</button> */}
                            {this.state.carts.length > 0 ?
                                <Link to="/checkout">
                                    <p><button type="button" className="btn btn-dark btn-md mt-5 btn-block">Checkout</button></p>
                                </Link>
                            :   <Link to="/checkout">
                                    <p><button type="button" className="btn btn-dark btn-md mt-5 btn-block" disabled>Checkout</button></p>
                                </Link>
                            }
                            {/* <p className="card-text">Category</p> */}
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}
export default connect(mapStateToProps, {getCart})(Cart)

import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import { MDBIcon } from "mdbreact";
import './Product.css'
import axios from '../../config/axios';
import {connect} from 'react-redux'
import { async } from 'q';
import Swal from 'sweetalert2';

class Product extends Component {

    state = {
        productDetail: {},
        size: [],
        quantity: 1,
        size_id: "",
        redirect: false
    }

    increment = () => {
        if(this.state.productDetail.stock > this.state.quantity) {
            this.setState({quantity: this.state.quantity + 1})
        }
    }
    decrement = () => {
        if(this.state.quantity > 1) {
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    getProductDetail = async() => {
        try {
            console.log(this.props)
           const res = await axios.get(`/get-products/${this.props.match.params.id}`)
            // console.log(res.data)
           this.setState({productDetail: res.data[0]})
        } catch (error) {
            console.log(error)
        }
        // console.log(this.props)
    }

    getSize = async () => {
        try {
            const res = await axios.get(`/size`)
            this.setState({size: res.data})
        } catch (error) {
            console.log(error)
        }
    }


    componentDidMount() {
        this.getProductDetail()
        this.getSize()
    }

    renderSize = () => {
        return this.state.size.map(item => {
            return (
                <option value={item.id}>{item.size_name}</option>
            )
        })
    }

    addToCart = async () => {
        // console.log(!this.props.user.isAdmin)
        
        if(!this.props.user.isAdmin && this.props.user.username) {
            if(this.state.size_id){
                try {
                    const res = await axios.get(`/get-cart-user/${this.props.user.id}/${this.state.productDetail.id}/${this.state.size_id}`)
                    if(res.data.length > 0) {
                        const resPatch = await axios.patch(`/carts/${res.data[0].id}`, {quantity: parseInt(res.data[0].quantity) + parseInt(this.state.quantity)})
                        // console.log(resPatch)
                        Swal.fire(
                            'Ditambahkan',
                            'You clicked the button!',
                            'success'
                        )
                    } else {
                        const resPost = await axios.post('/carts', {
                            product_id: this.state.productDetail.id,
                            user_id: this.props.user.id,
                            size_id: this.state.size_id,
                            quantity: this.state.quantity
                        })
                        if(resPost.data.length > 0) {
                            Swal.fire(
                                'Ditambahkan',
                                'You clicked the button!',
                                'success'
                            )
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            this.setState({redirect: true})
        }
    }

    render() {
        const { productDetail, quantity, size_id, redirect } = this.state
        if(redirect) return <Redirect to="/login"></Redirect>
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-5 ">
                        <div className="card">
                            <img className="card-img-top" src={`http://localhost:2019/products/image/${productDetail.image}`} alt="Card image cap"/>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card" style={{border: "none"}}>
                            <div className="card-body">
                                <h2 className="card-title">{productDetail.name}</h2>
                                <h4 className="mt-3">{productDetail.price}</h4>
                                < div className="card-text">
                                {productDetail.description}
                                </div>
                                <select className="custom-select mb-3" value={size_id} onChange={(event) => this.setState({size_id: event.target.value})}>
                                    <option value="">Choose your size</option>
                                    {this.renderSize()}
                                </select>
                                {/* <h5 className="mt-4">Stock</h5> */}
                                <button type="button" className="btn btn-dark btn-sm" onClick={this.decrement}>-</button>
                                <input type="text" style={{width: '50px'}} className="text-center" value={quantity} onChange={(event) => this.setState({quantity: parseInt(event.target.value)})} disabled></input>
                                <button type="button" className="btn btn-dark btn-sm" onClick={this.increment}>+</button>

                                <p><button type="button" className="btn btn-dark btn-md mt-5 btn-block" onClick={this.addToCart}>ADD TO CART</button></p>

                                {/* <p className="card-text">Category</p> */}
                            </div>
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
export default connect(mapStateToProps)(Product)

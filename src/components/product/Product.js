import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { MDBIcon } from "mdbreact";
import './Product.css'
import axios from '../../config/axios';

class Product extends Component {

    state = {
        productDetail: {},
        size: [],
        stock: null
    }

    getProductDetail = async() => {
        try {
           const res = await axios.get(`/products/${this.props.match.params.id}`)

           this.setState({productDetail: res.data[0]})
        } catch (error) {
            console.log(error)
        }
    }

    getSize = async () => {
        try {
            const res = await axios.get(`/size/${this.props.match.params.id}`)
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

    render() {
        const { productDetail } = this.state
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-5 ">
                        <div className="card">
                            <img className="card-img-top" src={'https://shiningbright.co.id/wp-content/uploads/2019/07/tshirt_0331.jpg'} alt="Card image cap"/>
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
                                <h6 className="mt-3 mb-0">size</h6>
                                <select className="custom-select">
                                    <option>Choose your option</option>
                                    {this.renderSize()}
                                </select>
                                <h5 className="mt-4">Stock</h5>
                                <button type="button" className="btn btn-dark btn-sm">+</button>
                                <input type="text" style={{width: '50px'}} className="text-center" value="1"></input>
                                <button type="button" className="btn btn-dark btn-sm">-</button>

                                <p><button type="button" className="btn btn-dark btn-md mt-5 btn-block">ADD TO CART</button></p>

                                {/* <p className="card-text">Category</p> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product

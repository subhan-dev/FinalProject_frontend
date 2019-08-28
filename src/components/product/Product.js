import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import { MDBIcon } from "mdbreact";
import './Product.css'

class Product extends Component {

    state = {
        options: [
            {
                text: "Option 1",
                value: "1"
            },
            {
                text: "Option 2",
                value: "2"
            },
            {
                text: "Option 3",
                value: "3"
            }
        ]
    };

    render() {
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
                                <h2 className="card-title">Card title</h2>
                                <h4 className="mt-3">Rp 200.000</h4>
                                < div className="card-text">
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                                </div>
                                <h6 className="mt-3 mb-0">size</h6>
                                <select className="custom-select">
                                    <option>Choose your option</option>
                                    <option value="1">Option 1</option>
                                    <option value="2">Option 2</option>
                                    <option value="3">Option 3</option>
                                </select>
                                <h4 className="mt-4">Stock</h4>
                                <button type="button" className="btn btn-dark btn-sm">+</button>
                                <input type="text" style={{width: '50px'}} className="text-center" value="1"></input>
                                <button type="button" className="btn btn-dark btn-sm">-</button>

                                <p><button type="button" className="btn btn-dark btn-md mt-5 btn-block">ADD TO CART</button></p>

                                <p className="card-text">Category</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Product

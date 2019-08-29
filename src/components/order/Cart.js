import React, { Component } from 'react'

class Cart extends Component {
    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-8">
                        <table className="table table-hover mb-5 mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                    <div className="card col-4" style={{border:'none'}}>
                        <div className="card-body">
                            <h2 className="card-title">Cart Total</h2>
                            <hr/>
                            <div className="mt-3">
                                <div className="d-inline-block mr-4">
                                    <h5>Subtotal</h5>
                                </div>
                                <div className="d-inline-block ml-4">
                                    <h5>Rp</h5>
                                </div>
                            </div>
                            <hr/>
                            <div className="mt-3">
                                <div className="d-inline-block mr-4">
                                    <h5>Total</h5>
                                </div>
                                <div className="d-inline-block ml-5">
                                    <h5>Rp</h5>
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

                            <p><button type="button" className="btn btn-dark btn-md mt-5 btn-block">Checkout</button></p>

                            {/* <p className="card-text">Category</p> */}
                        </div>
                    </div>
                </div>
            
            </div>
        )
    }
}

export default Cart

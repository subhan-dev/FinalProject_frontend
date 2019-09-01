import React, { Component } from 'react'
import axios from '../../config/axios'
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom';

class Checkout extends Component {

    state = {
        carts: [],
        bank: [],
        shipping: [],
        order: false
    }

    getBank = async () => {
        try {
            const res = await axios.get(`/bank`)
            // console.log(res.data)
            this.setState({bank: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    getShipping = async () => {
        try {
            const res = await axios.get(`/kurir`)
            // console.log(res.data)
            this.setState({shipping: res.data})
        } catch (error) {
            console.log(error)
        }
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

    componentDidMount () {
        this.getCart()
        this.getBank()
        this.getShipping()
        
    }

    renderCart = () => {
        return this.state.carts.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price * item.quantity}</td>
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
    renderBank = () => {
        return this.state.bank.map(item => {
            return (
                <option key={item.id} value={item.id}>{item.name_bank}</option>
            )
        })
    }
    renderShipping = () => {
        return this.state.shipping.map(item => {
            return (
                <option key={item.id} value={item.id}>{item.kurir}</option>
            )
        })
    }

    handleOrder = async () => {
        const penerima = this.name.value
        const address = this.address.value
        const phone = this.phone.value
        const city = this.city.value
        const kode_pos = this.zip.value

        const bank_id = this.bank.value
        const kurir = this.kurir.value

        if(penerima && address && phone && city && kode_pos && bank_id && kurir && this.state.carts.length > 0) {
            try {
                const resAddress = await axios.post(`/address`, {
                    penerima, address, phone, city, kode_pos, user_id: this.props.user.id
                })
                const resOrder = await axios.post('/order', {
                    order_number: Date.now(),
                    user_id: this.props.user.id,
                    total_harga: this.renderTotal(),
                    shipping_id: kurir,
                    bank_id: bank_id,
                    alamat_id: resAddress.data[0].id
                })
                // console.log(resOrder.data)
                const resCart = await axios.get(`/get-carts-migrate/${this.props.user.id}`)
                let arrayCart = []
                for(let i = 0; i < resCart.data.length; i++) {
                    arrayCart.push([resCart.data[i].product_id, resCart.data[i].quantity, resCart.data[i].size_id, resOrder.data[0].id])
                }

                const resOrderDetail = await axios.post('/order-detail', [arrayCart])
                console.log(resOrderDetail)
                await axios.delete(`/carts/${this.props.user.id}`)

                this.setState({order: true})
            } catch (error) {
                console.log(error)
            }
        }
    }
    // handleInsertOrderDetail = (order_id) => {
    //     let arrayCart = []
    //     let carts = this.state.carts

    //     for(let i = 0; i < carts.length; i++) {
    //         arrayCart.push([carts[i].product_id, carts[i].quantity, carts[i].size_id, order_id])
    //     }
    //     return arrayCart
    // }

    render() {
        if(this.state.order) return <Redirect to="/list-order"></Redirect>
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-8">
                        <strong><h3 className="text-center">BILLING</h3></strong>
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label for="inputEmail4">Nama Penerima</label>
                                <input type="email" className="form-control" id="inputEmail4" placeholder="Nama" ref={(input) => this.name = input}/>
                                </div>
                                
                            </div>
                            <div className="form-group">
                                <label for="inputAddress">Address</label>
                                <input type="text" className="form-control" id="inputAddress" placeholder="Address" ref={(input) => this.address = input}/>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label for="inputAddress2">Phone</label>
                                    <input type="text" className="form-control" id="inputAddress2" placeholder="Phone" ref={(input) => this.phone = input}/>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                <label for="inputCity">City</label>
                                <input type="text" className="form-control" id="inputCity" placeholder="city" ref={(input) => this.city = input}/>
                                </div>
                                {/* <div className="form-group col-md-4">
                                <label for="inputState">State</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                                </div> */}
                                <div className="form-group col-md-2">
                                <label for="inputZip">Zip</label>
                                <input type="text" className="form-control" id="inputZip" placeholder="ZIP" ref={(input) => this.zip = input}/>
                                </div>
                            </div>
                        </form>

                    </div>
                    <div className="col-4">
                        <table className="table table-hover mb-5 mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">Poduct</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCart()}
                            </tbody>
                        </table>
                        <div className="card" style={{border:'none'}}>
                        <div className="card-body">
                            <h2 className="card-title">Total</h2>
                            <hr/>
                            {/* <div className="mt-3">
                                <div className="d-inline-block mr-4">
                                    <h5>Subtotal</h5>
                                </div>
                                <div className="d-inline-block ml-4">
                                    <h5>Rp</h5>
                                </div>
                            </div> */}
                            {/* <hr/> */}
                            <div className="mt-3">
                                <div className="d-inline-block mr-4">
                                    <h5>Total</h5>
                                </div>
                                <div className="d-inline-block ml-5">
                                    <h5>Rp {this.renderTotal()}</h5>
                                </div>
                            </div>
                            <hr/>
                            <div className="form-group">
                                <label for="inputState">Kurir</label>
                                <select id="inputState" className="form-control" ref={(input) => this.kurir = input}>
                                    <option value="">Choose...</option>
                                    {this.renderShipping()}
                                </select>
                            </div>
                            <div className="form-group">
                                <label for="inputState">Bank</label>
                                <select id="inputState" className="form-control" ref={(input) => this.bank = input}>
                                    <option value="">Choose...</option>
                                    {this.renderBank()}
                                </select>
                            </div>
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
                            
                            <p><button type="button" className="btn btn-dark btn-md mt-5 btn-block" onClick={this.handleOrder}>Place Order</button></p>
                            
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

export default connect(mapStateToProps)(Checkout)

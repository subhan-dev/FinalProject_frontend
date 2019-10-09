import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from '../../../config/axios'
import {connect} from 'react-redux'

class DetailHistory extends Component {

    state = {
        detailTransaksi: {},
        detailOrder: []
    }


    getOrderDetail = async() => {
        console.log(this.props.match.params.id)
        try {
            const res = await axios.get(`/order-detail/${this.props.match.params.id}`)
            console.log(res.data)
            this.setState({detailOrder: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    getOrder = async() => {
        try {
            const res = await axios.get(`/order-byid2/${this.props.match.params.id}`)
            this.setState({detailTransaksi: res.data[0]})
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getOrderDetail()
        this.getOrder()
    }
    renderDetailOrder = () => {
        return this.state.detailOrder.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.size_name}</td>
                    <td>{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity * item.price}</td>
                </tr>
            )
        })
    }
    
    render() {
        console.log(this.state.detailTransaksi)
        const { detailTransaksi } = this.state
        if(this.props.user.username && this.props.user.isAdmin) {
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
                                        <th scope="col">Sub Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderDetailOrder()}
                                </tbody>
                            </table>
                        </div>
                        <div className="card col-4" style={{border:'none'}}>
                            <div className="card-body">
                                <div className="mt-3">
                                    <div className="d-inline-block mr-4">
                                        <h5>Shipping</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>{detailTransaksi.kurir}</h5>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-inline-block mr-4">
                                        <h5>Bank</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>{detailTransaksi.name_bank}</h5>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-inline-block mr-4">
                                        <h5>Norek</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>{detailTransaksi.norek}</h5>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-inline-block mr-4">
                                        <h5>Phone</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>{detailTransaksi.phone}</h5>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div>
                                        <h5>Address</h5>
                                    </div>
                                    <p>
                                        {detailTransaksi.address} {detailTransaksi.city} {detailTransaksi.kode_pos}
                                    </p>
                                </div>
                                <hr/>
                                <div className="mt-3">
                                    <div className="d-inline-block mr-4">
                                        <h5>Total</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>{detailTransaksi.total_harga}</h5>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                
                </div>
            )
        }
        return <h1 className="text-center" style={{fontSize: '350px'}}>404</h1>
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(DetailHistory)

import React, { Component } from 'react'
import axios from '../../config/axios';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

class PaymentUpload extends Component {
    state = {
        detailOrder: [],
        order: {},
        redirect: false
    }
    getOrderDetail = async() => {
        try {
            const res = await axios.get(`/order-detail/${this.props.match.params.order_id}`)
            this.setState({detailOrder: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    getOrder = async() => {
        try {
            const res = await axios.get(`/order-byid/${this.props.match.params.order_id}`)
            this.setState({order: res.data[0]})
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
                <div className="mt-3">
                    <div className="d-inline-block mr-4">
                        <h5>{item.name} x {item.quantity}</h5>
                    </div>
                    <div className="d-inline-block ml-4">
                        <h5>{item.price * item.quantity}</h5>
                    </div>
                </div>
            )
        })
    }

    handleUploadTransaksi = async () => {
        if(this.bukti.value) {
            const formData = new FormData()
            formData.append('image', this.bukti.files[0])
            try {
                const res = await axios.post(`/upload-bukti/${this.props.match.params.order_id}`, formData)
                console.log(res.data)
                this.setState({redirect: true})
            } catch (error) {
                console.log(error)
            }
        }
    }

    render() {
        const {kurir, name_bank, norek, total_harga, user_upload} = this.state.order
        if(this.state.redirect) return <Redirect to='/list-order'></Redirect>
        if(user_upload) return <h1 className="container mt-5">Waiting</h1>
        if(!this.props.user.username) return <Redirect to="/login"></Redirect>
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 ">
                        <div className="card" >
                            <div className="card-body">
                                <h2 className="card-title">Order Detail</h2>
                                <hr/>
                                {this.renderDetailOrder()}
                                <div className="mt-3">
                                    <div className="d-inline-block mr-4">
                                        <h5>Shipping</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>{kurir}</h5>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-inline-block mr-4">
                                        <h5>Total</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>{total_harga}</h5>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-inline-block mr-4">
                                        <h5>Bank</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>{name_bank} Rek {norek}</h5>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <div className="d-inline-block mr-4">
                                        <h5>Total</h5>
                                    </div>
                                    <div className="d-inline-block ml-5">
                                        <h5>{total_harga}</h5>
                                    </div>
                                </div>
                                <hr/>
                                <label>Upload Bukti Transaksi</label>
                                <input type="file" className="form-control-file" ref={input => this.bukti = input}/>
                                <button className="btn btn-success mt-3" onClick={this.handleUploadTransaksi}>Upload</button>
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

export default connect(mapStateToProps)(PaymentUpload)

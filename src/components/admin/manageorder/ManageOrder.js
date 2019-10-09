import React, { Component } from 'react'
import axios from '../../../config/axios';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export class ManageOrder extends Component {

    state = {
        orderUser: []
    }

    getOrder = async () => {
        try {
            const res = await axios.get('/order-user-upload')
            console.log(res.data)
            this.setState({orderUser: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getOrder()
    }

    handleDeclineOrder = async (id) => {
        try {
            const res = await axios.delete(`/delete-bukti/${id}`)
            // console.log(res)
            this.getOrder()
        } catch (error) {
            console.log(error)
        }
    }
    handleAccOrder = async (id) => {
        try {
            const res = await axios.patch(`/acc-order/${id}`)
            console.log(res.data)
            this.getOrder()
        } catch (error) {
            console.log(error)
        }
    }
    renderOrder = () => {
        return this.state.orderUser.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.order_number}</td>
                    <td>{item.order_date.slice(0,10)}</td>
                    <td>{item.total_harga}</td>
                    <td><a href={`http://localhost:2019/payment-upload/${item.user_upload}`}><img src={`http://localhost:2019/payment-upload/${item.user_upload}`} alt="bukti" style={{width: '100px'}}></img></a></td>
                    <td>
                        {/* <Link to={`detail-transaksi/${item.id}`}>
                            <button className="btn btn-success mr-2">Detail</button>
                        </Link> */}
                        <button className="btn btn-primary mr-2" onClick={() => this.handleAccOrder(item.id)}>Acc</button>
                        <button className="btn btn-danger mr-2" onClick={() => this.handleDeclineOrder(item.id)}>Decl</button>
                    </td>
                </tr>
            )
        })
    }
    render() {
        if(this.props.user.username && this.props.user.isAdmin) {
            return (
                <div className="container mt-5">
                    <table className="table table-hover mb-5 mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Order Number</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Total</th>
                                <th scope="col">Bukti Transfer</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderOrder()}
    
                        </tbody>
                    </table>
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

export default connect(mapStateToProps)(ManageOrder)

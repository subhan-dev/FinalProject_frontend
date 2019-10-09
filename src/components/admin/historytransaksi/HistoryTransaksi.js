import React, { Component } from 'react'
import axios from '../../../config/axios'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class HistoryTransaksi extends Component {

    state = {
        orderUser: []
    }

    getOrder = async () => {
        try {
            const res = await axios.get('/history-transaksi')
            console.log(res.data)
            this.setState({orderUser: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getOrder()
    }
    renderOrder = () => {
        return this.state.orderUser.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.order_number}</td>
                    <td>{item.username}</td>
                    <td>{item.order_date.slice(0,10)}</td>
                    <td>{item.total_harga.toLocaleString('IN')}</td>
                    <td><a href={`http://localhost:2019/payment-upload/${item.user_upload}`}><img src={`http://localhost:2019/payment-upload/${item.user_upload}`} alt="bukti" style={{width: '100px'}}></img></a></td>
                    <td>
                        <Link to={`detail-history/${item.id}`}>
                            <button className="btn btn-success mr-2">Detail</button>
                        </Link>
                    </td>
                </tr>
            )
        })
    }

    render() {
        if(this.props.user.username && this.props.user.isAdmin) {
            return (
                <div className="container mt-5">
                    <h2 className="text-center mb-3">History Transaksi</h2>
                    <table className="table table-hover mb-5 mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Order Number</th>
                                <th scope="col">Username</th>
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
export default connect(mapStateToProps)(HistoryTransaksi)

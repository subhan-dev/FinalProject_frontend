import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import axios from '../../config/axios'

class ListOrder extends Component {

    state = {
        order: []
    }
    getOrder = async () => {
        try {
            const res = await axios.get(`/order/${this.props.user.id}`)
            this.setState({order: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getOrder()
    }
    handleStatus = (status) => {
        if(status === null) {
            return <td>Silahkan Upload Bukti Transfer</td>
        } else if(status === 'UPLOAD') {
            return <td>Menunggu Konfirmasi</td>
        } else if(status === 'REJECT') {
            return <td>Silahkan Upload Ulang Bukti Transfer</td>
        } else {
            return <td>Pembayaran Selesai</td>
        }
    }

    renderOrderList = () => {
        return this.state.order.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.order_number}</td>
                    <td>{item.order_date.slice(0,10)}</td>
                    {/* {!item.user_upload && <td>Silahkan Upload Bukti Transfer</td>}
                    {item.user_upload && !item.payment_status && <td>Menunggu Konfirmasi</td>}
                    {item.user_upload && item.payment_status && <td>Pembayaran diterima</td>} */}
                    {this.handleStatus(item.status)}
                    <td>
                        {item.status === null || item.status === 'REJECT' ? 
                            <Link to={`payment-upload/${item.id}`}>
                                <button className="btn btn-primary mr-2">Upload</button>
                            </Link> :
                            <Link to={`payment-upload/${item.id}`}>
                                <button className="btn btn-primary mr-2" disabled>Upload</button>
                            </Link>
                        }
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div className="container mt-5">
                <table className="table table-hover mb-5 mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Order Number</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Upload</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderOrderList()}
                    </tbody>
                </table>                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(ListOrder)

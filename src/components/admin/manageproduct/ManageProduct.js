import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from '../../../config/axios';
import Swal from 'sweetalert2';

class ManageProduct extends Component {

    state = {
        products: []
    }

    getProducts = async () => {
        try {
            const res = await axios.get('/products-manage')
            this.setState({products: res.data})
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getProducts()
    }
    handleDelete = async (id) => {
        const res =  await axios.delete(`/products/${id}`)
        Swal.fire(
            'Data berhasil dihapus',
            'success'
        )
        this.getProducts()
    }
    renderList = () => {
        return this.state.products.map(item => {
            return (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.description}</td>
                    <td>{item.name_category}</td>
                    <td>{item.name_brand}</td>
                    <td>{item.price.toLocaleString('IN')}</td>
                    <td>{item.stock}</td>
                    <td><img className="list" src={`http://localhost:2019/products/image/${item.image}`} alt={item.name} style={{width:'50px'}}></img></td>
                    <td>
                        <Link to={`/edit-product/${item.id}`}><button className="btn btn-primary mr-2">Edit</button></Link>
                        <button className="btn btn-danger" onClick={() => {this.handleDelete(item.id)}}>Delete</button>
                    </td>
                </tr>
            )
        })
    }
    

    render() {
        // console.log(this.state.products)
        const {user} = this.props
        if(user.isAdmin && user.username) {
            return (
                <div className="container">
                    <h1 className="display-5 text-center">List Product</h1>
                    <div className="d-flex justify-content-end">
                        <Link to='/add-product'>
                            <button className="btn btn-primary">Add Product</button>
                        </Link>
                    </div>
                    <table className="table table-hover mb-5 mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Desc</th>
                                <th scope="col">Category</th>
                                <th scope="col">Brand</th>
                                <th scope="col">Price</th>
                                <th scope="col">Stock</th>
                                <th scope="col">PICTURE</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderList()}
                        </tbody>
                    </table>
                </div>
            )
        }
        return (
            <h1 className="text-center" style={{fontSize: '350px'}}>404</h1>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps)(ManageProduct)

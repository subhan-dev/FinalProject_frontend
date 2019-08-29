import React, { Component } from 'react'
import axios from '../../../config/axios'
import Swal from 'sweetalert2';

class ManageStock extends Component {
    state = {
        dataStock: {
            size_id: '',
            product_id: '',
            stock: '',
        },
        size: [],
        products: [],
        listStock: [],
        selectedId: 0
    }

    handleChange = (event) => {
        this.setState({
            dataStock: {
                ...this.state.dataStock,
                [event.target.name]: event.target.value
            }
        })
    }
    getStock = async() => {
        try {
            const res = await axios.get('/stock')
            // console.log(res.data)
            this.setState({listStock: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    getProducts = async () => {
        try {
            const res = await axios.get('/products')
            this.setState({products: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    getSize = async () => {
        try {
            const res = await axios.get('/size')
            this.setState({size: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getProducts()
        this.getSize()
        this.getStock()
    }
    renderProduct = () => {
        return this.state.products.map(item => {
            return (
                <option value={item.id}>{item.name}</option>
            )
        })
    }
    renderSize = () => {
        return this.state.size.map(item => {
            return (
                <option value={item.id}>{item.size_name}</option>
            )
        })
    }
    renderListStock = () => {
        return this.state.listStock.map(item => {
            if(item.id !== this.state.selectedId){
                return (
                    <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.size_name}</td>
                        <td>{item.stock}</td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={() => {this.setState({selectedId: item.id})}}>Edit</button>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={item.name}>
                        <td>{item.name}</td>
                        <td>{item.size_name}</td>
                        {/* <td>{item.stock}</td> */}
                        <td><input type="number" defaultValue={item.stock}/></td>
                        <td>
                            <button className="btn btn-success mr-2">Save</button>
                            <button className="btn btn-warning" onClick={() => {this.setState({selectedId: 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }
    handleAddStock = async () => {
        const {dataStock} = this.state
        if(dataStock.product_id && dataStock.size_id && dataStock.stock) {
            // if(this.state.listStock.includes(dataStock.idproduct)) {
            //     alert('ok')
            // }
            try {
                const res = await axios.get(`/stock-product/${dataStock.product_id}`)
                console.log(res.data)
                if(res.data.length > 0) {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Product sudah ada',
                      })
                } else {
                    try {
                        const res = await axios.post('/stock', dataStock)
                        if(res.data.length > 0) {
                            Swal.fire(
                                "Success",
                                "success"
                            )
                            this.getStock()
                        }
                    } catch (error) {
                        console.log(error)
                    }
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    handleEditStock = () => {

    }

    render() {
        // console.log(this.state.listStock)
        const {product_id, size_id, stock} = this.state.dataStock
        return (
            <div className="container">
                <h1 className="display-5 text-center">List Stock</h1>
                <div className="row">
                    <div className="col-3">
                        <select className="custom-select" value={product_id} name="product_id" onChange={this.handleChange}>
                            <option value ="">Choose Product</option>
                            {this.renderProduct()}
                        </select>
                    </div>
                    <div className="col-3">
                        <select className="custom-select" value={size_id} name="size_id" onChange={this.handleChange}>
                            <option value ="">Choose Size</option>
                            {this.renderSize()}
                        </select>
                    </div>
                    <div className="col-3">
                        <input type="number" className="form-control" placeholder="stock" name="stock" value={stock} onChange={this.handleChange}/>
                    </div>
                    <div className="col-3 text-right">

                        <button className="btn btn-success" onClick={this.handleAddStock}>Add Stock</button>
                    </div>
                </div>
                <div className="d-flex justify-content-end">
                </div>
                <table className="table table-hover mb-5 mt-4">
                    <thead>
                        <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Size</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderListStock()}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ManageStock

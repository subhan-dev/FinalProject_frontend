import React, { Component } from 'react'
import axios from '../../../config/axios'
import Swal from 'sweetalert2';
import {connect} from 'react-redux'

class ManageCategory extends Component {

    state = {
        category: [],
        brand: [],
        selectedId: 0,
        selectedId2: 0
    }

    getCategory = async () => {
        try {
            const res = await axios.get('/category')
            // console.log(res.data)
            this.setState({category: res.data})
        } catch (error) {
            console.log(error)
        }
    }

    getBrand = async () => {
        try {
            const res = await axios.get('/brands')
            // console.log(res.data)
            this.setState({brand: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    componentDidMount() {
        this.getCategory()
        this.getBrand()
    }

    handleAddCategory = async () => {
        // console.log(this.category.value)
        if(this.category.value) {
            try {
                const res = await axios.post('/category', {name_category: this.category.value})

                if(res.data.length>0) {
                    Swal.fire(
                        "Success",
                        "success"
                    )
                    this.getCategory()
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Data sudah ada'
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    handleAddBrand = async () => {
        // console.log(this.category.value)
        if(this.brand.value) {
            try {
                const res = await axios.post('/brand', {name_brand: this.brand.value})

                if(res.data.length>0) {
                    Swal.fire(
                        "Success",
                        "success"
                    )
                    this.getBrand()
                } else {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: 'Data sudah ada'
                    })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    handleDeleteCategory = async (id) => {
        await axios.delete(`/category/${id}`)
        this.getCategory()
    }
    handleDeleteBrand = async (id) => {
        await axios.delete(`/brand/${id}`)
        this.getBrand()
    }
    renderCategory = () => {
        return this.state.category.map(item => {
            if(item.id !== this.state.selectedId){
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name_category}</td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={() => {this.setState({selectedId: item.id})}}>Edit</button>
                            <button className="btn btn-danger" onClick={() => this.handleDeleteCategory(item.id)}>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td><input type="text" defaultValue={item.name_category} ref={(input) => {this.editCategory = input}}></input></td>
                        <td>
                            <button className="btn btn-success mr-2" onClick={() => {this.handleEditCategory(item.id)}}>Save</button>
                            <button className="btn btn-warning" onClick={() => {this.setState({selectedId: 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }
    renderBrand = () => {
        return this.state.brand.map(item => {
            if(item.id !== this.state.selectedId2){
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name_brand}</td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={() => {this.setState({selectedId2: item.id})}}>Edit</button>
                            <button className="btn btn-danger" onClick={() => this.handleDeleteBrand(item.id)}>Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td><input type="text" defaultValue={item.name_brand} ref={(input) => {this.editBrand = input}}></input></td>
                        <td>
                            <button className="btn btn-success mr-2" onClick={() => {this.handleEditBrand(item.id)}}>Save</button>
                            <button className="btn btn-warning" onClick={() => {this.setState({selectedId2: 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    handleEditCategory = async (id) => {
        try {
            const res = await axios.patch(`/category/${id}`, {name_category: this.editCategory.value})
            if(res.data.length > 0) {
                this.setState({selectedId:0})
                this.getCategory()
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Data sudah ada'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
    handleEditBrand = async (id) => {
        try {
            const res = await axios.patch(`/brand/${id}`, {name_brand: this.editBrand.value})
            if(res.data.length > 0) {
                this.setState({selectedId2:0})
                this.getBrand()
            } else {
                Swal.fire({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Data sudah ada'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }


    render() {
        if(this.props.user.username && this.props.user.isAdmin) {
            return (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-6">
                        <form>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Category</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="Category" ref={input => {this.category = input}}/>
                                </div>
                            </div>
                        </form>
                        <div className="text-right">
                            <button className="btn btn-success" onClick={this.handleAddCategory}>Add</button>
                        </div>
                        <table className="table table-hover mb-5 mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderCategory()}
                            </tbody>
                        </table>
                        </div>
                        <div className="col-6">
                        <form>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Brand</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" placeholder="Brand" ref={input => {this.brand = input}}/>
                                </div>
                            </div>
                        </form>
                            <div className="text-right">
                                <button className="btn btn-success" onClick={this.handleAddBrand}>Add</button>
                            </div>
                        <table className="table table-hover mb-5 mt-4">
                            <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Name Brand</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderBrand()}
                            </tbody>
                        </table>
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

export default connect(mapStateToProps)(ManageCategory)

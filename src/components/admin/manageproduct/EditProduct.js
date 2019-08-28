import React, { Component } from 'react'
import axios from '../../../config/axios';
import Swal from 'sweetalert2';
import {Redirect} from 'react-router-dom'

class EditProduct extends Component {
    state = {
        category: [],
        brand: [],
        productNew: {
            name: '',
            description: '',
            price: '',
            brand_id: '',
            category_id: '',
        },
        redirect: false
    }

    componentDidMount() {
        this.getCategory()
        this.getBrand()
    }
    handleChange = (event) => {
        this.setState({
            productNew: {
                ...this.state.productNew,
                [event.target.name]: event.target.value
            }
        })
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

    renderCategory = () => {
        return this.state.category.map(item => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })
    }
    renderBrand = () => {
        return this.state.brand.map(item => {
            return (
                <option key={item.id} value={item.id}>{item.name}</option>
            )
        })
    }
    handleEditProduct = async () => {
        const {productNew} = this.state
        let dataEdit = {...productNew}
        let arr = Object.keys(productNew)
        arr.forEach(item => {
            if(!productNew[item]) {
                delete dataEdit[item]
            }
        })

        const formData = new FormData()
        let newArr = Object.keys(dataEdit)
        if(newArr.length > 0 || this.image.files[0] !== undefined) {
            newArr.forEach(item => {
                formData.append(item, dataEdit[item])
            })
            if(this.image.files[0] !== undefined) {
                formData.append('image', this.image.files[0])
            }
            // console.log(this.props.match.params.id)
            try {
                const res = await axios.patch(`/products/${this.props.match.params.id}`, formData)
                if(typeof res.data === 'string') {
                    Swal.fire({
                        type: 'error',
                        title: 'Oops...',
                        text: res.data
                    })
                } else {
                    Swal.fire(
                        'Success',
                        'success'
                    )
                    this.setState({redirect: true})
                }
            } catch (error) {
                console.log(error)
            }
        } else {
            alert('wadaw')
        }

    }
    render() {
        const {name, description, price, brand_id, category_id} = this.state.productNew
        if(this.state.redirect) return <Redirect to='/manage-product'></Redirect>
        return (
            <div className="container">
                <h2 className="text-center mb-3">Add Product</h2>
                <form>
                    <div className="form-group col-4">
                        <label>Nama Product</label>
                        <input type="text" className="form-control" placeholder="Nama Product" name="name" value={name} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-6">
                        <label>Deskripsi</label>
                        <textarea className="form-control" placeholder="Deskripsi" name="description" value={description} onChange={this.handleChange}/>
                    </div>
                    <div className="form-group col-2">
                        <label>Price</label>
                        <input type="number" className="form-control" placeholder="0" name="price" value={price} onChange={this.handleChange} />
                    </div>
                    <div className="form-group col-3">
                        <label>Brand</label>
                        {/* <div className="col-3"> */}
                            <select className="custom-select" value={brand_id} name="brand_id" onChange={this.handleChange}>
                                <option value="">Choose</option>
                                {this.renderBrand()}
                            </select>

                        {/* </div> */}
                    </div>
                    <div className="form-group col-3">
                        <label>Category</label>
                        {/* <div className="col-3"> */}
                            <select className="custom-select" value={category_id} name="category_id" onChange={this.handleChange}>
                                <option value ="">Choose</option>
                                {this.renderCategory()}
                            </select>

                        {/* </div> */}
                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file" className="form-control-file" ref={input => this.image = input}/>
                        {/* <input type="file" className="form-control-file" value={image} name="image" onChange={this.handleChange}/> */}
                    </div>
                    
                </form>
                <button className="btn btn-success btn-block mt-4 mb-3" onClick={this.handleEditProduct}>Save</button>
            </div>
        )
    }
}

export default EditProduct

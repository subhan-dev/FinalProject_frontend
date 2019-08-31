import React, { Component } from 'react'
import axios from '../../../config/axios';
import Swal from 'sweetalert2';

class AddProduct extends Component {

    state = {
        category: [],
        brand: [],
        productNew: {
            name: '',
            description: '',
            price: '',
            brand_id: '',
            category_id: '',
            stock: ''
        }
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

    renderCategory = () => {
        return this.state.category.map(item => {
            return (
                <option key={item.id} value={item.id}>{item.name_category}</option>
            )
        })
    }
    renderBrand = () => {
        return this.state.brand.map(item => {
            return (
                <option key={item.id} value={item.id}>{item.name_brand}</option>
            )
        })
    }
    handleChange = (event) => {
        this.setState({
            productNew: {
                ...this.state.productNew,
                [event.target.name]: event.target.value
            }
        })
    }

    handleAddProduct = async () => {
        const {name, description, price, brand_id, category_id, stock} = this.state.productNew
        console.log(stock)
        if(name && description && price && stock && brand_id && category_id && this.image.files[0]) {
            const formData = new FormData()
            
            formData.append('name', name)
            formData.append('description', description)
            formData.append('price', price)
            formData.append('stock', parseInt(stock))
            formData.append('brand_id', brand_id)
            formData.append('category_id', category_id)
            formData.append('image', this.image.files[0])
            
            try {
                const res = await axios.post('/products', formData)
                console.log(res)
                    if(typeof res.data === "string") {
                        Swal.fire({
                            type: 'error',
                            title: 'Oops...',
                            text: res.data
                        })
                    } else {
                        this.setState({
                            productNew: {
                                name: '',
                                description: '',
                                price: '',
                                brand_id: '',
                                category_id: '',
                                stock: ''
                            }
                        })
                        Swal.fire(
                            'Success',
                            'success'
                        )
                        this.image.value = ''
                    }
            } catch (error) {
                console.log(error)
            }
        }
    }
    render() {
        const {name, description, price, brand_id, category_id, stock} = this.state.productNew
        // console.log(this.image)
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
                    <div className="form-group col-2">
                        <label>Stock</label>
                        <input type="number" className="form-control" placeholder="0" name="stock" value={stock} onChange={this.handleChange} />
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
                                <option value="">Choose</option>
                                {this.renderCategory()}
                            </select>

                        {/* </div> */}
                    </div>
                    <div className="form-group col-12">
                        <label>Image</label>
                        <input type="file" className="form-control-file" ref={input => this.image = input}/>
                    </div>
                    
                </form>
                <button className="btn btn-success btn-block mt-4 mb-3" onClick={this.handleAddProduct}>Save</button>
            </div>
        )
    }
}

export default AddProduct

import React, { Component } from 'react'
import axios from '../../../config/axios'

class ManageCategory extends Component {

    state = {
        category: [],
        brand: [],
        inputCategory: '',
        inputBrand: '',
        selectedId: 0
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
            if(item.id !== this.state.selectedId){
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>
                            <button className="btn btn-primary mr-2" onClick={() => {this.setState({selectedId: item.id})}}>Edit</button>
                            <button className="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                )
            } else {
                return (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td><input type="text" defaultValue={item.name}></input></td>
                        <td>
                            <button className="btn btn-success mr-2">Save</button>
                            <button className="btn btn-warning" onClick={() => {this.setState({selectedId: 0})}}>Cancel</button>
                        </td>
                    </tr>
                )
            }
        })
    }

    render() {
        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-6">
                    <form>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Category</label>
                            <div class="col-sm-10">
                            <input type="text" class="form-control" placeholder="Category"/>
                            </div>
                        </div>
                        <div className="text-right">
                            <button className="btn btn-success">Add</button>

                        </div>
                    </form>
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
                            <input type="text" class="form-control" placeholder="Brand"/>
                            </div>
                        </div>
                        <div className="text-right">
                            <button className="btn btn-success">Add</button>

                        </div>
                    </form>
                    <table className="table table-hover mb-5 mt-4">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name Brand</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default ManageCategory

import React, { Component } from "react";
import { MDBCollapse, Button } from "mdbreact";
import {  MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBadge, MDBCollapseHeader } from "mdbreact";
import {Link} from 'react-router-dom'
import axios from '../../config/axios'
import { async } from "q";

class ShopCategory extends Component {
    state={
        collapseID: "",
        collapseID2: "",
        products: [],
        brand: [],
        search: {
            searchString: "",
            min: "",
            max: ""
        },
        checkedItems: []
    }

    toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
    toggleCollapse2 = collapseID2 => () =>
    this.setState(prevState => ({
        collapseID2: prevState.collapseID2 !== collapseID2 ? collapseID2 : ""
    }));

    componentDidMount(){
        this.getProducts()
        this.getBrand()

    }
    async componentWillUpdate(prevProps){
        
        if(this.props.match.params.id !== prevProps.match.params.id) {
            await this.getProducts2(prevProps.match.params.id)
        }
    }

    getBrand = async () => {
        try {
            const res = await axios.get('/brands')
            this.setState({brand: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    getProducts2 = async (id) => {
        try {
            const res = await axios.get(`/products-category/${id}`)
            this.setState({products: res.data})
        } catch (error) {
            console.log(error)
        }
        
    }

    getProducts = async () => {
        try {
            const res = await axios.get(`/products-category/${this.props.match.params.id}`)
            this.setState({products: res.data})
        } catch (error) {
            console.log(error)
        }
        
        
    }

    renderProduct =(products) =>{
        return products.map(item => {
            return (
                <MDBCol lg="4" className="mb-lg-5 mb-4" key={item.id}>
                    <Link to={`/product-detail/${item.id}`}>
                        <MDBCard className="align-items-center">
                        <MDBCardImage
                            src={`http://localhost:2019/products/image/${item.image}`}
                            top
                            alt={item.name}
                            overlay="white-slight"
                            style={{height: '215px'}}
                        />
                        <MDBCardBody className="text-center grey-text">
                            <strong>
                                {item.name}
                            </strong>
                            <h6>
                                IDR {item.price.toLocaleString('IN')}
                            </h6>
                        </MDBCardBody>
                        </MDBCard>
                    </Link>
                </MDBCol>
            )
        })
    }
    handleChangeBrand = (event) => {
        if(event.target.checked && !this.state.checkedItems.includes(event.target.value)) {
            this.setState({
                checkedItems: [...this.state.checkedItems, event.target.value]
            })
        } else if(!event.target.checked && this.state.checkedItems.includes(event.target.value)) {
            let array = [...this.state.checkedItems]
            var index = array.indexOf(event.target.value)
            if (index !== -1) {
                array.splice(index, 1);
                this.setState({checkedItems: array});
            }
        }
    }

    renderBrand = () => {
        return this.state.brand.map(item => {
            return (
                <label className="form-check" key={item.id}>
                    <input className="form-check-input" 
                        type="checkbox" 
                        value={item.id}
                        // isChecked={item.id === this.state.cek}
                        onChange={this.handleChangeBrand}
                    />
                    <span className="form-check-label">
                        {item.name_brand}
                    </span>
                </label> 
            )
        })
    }
    handleChange = (event) => {
        this.setState({
            search: {
                ...this.state.search,
                [event.target.name]: event.target.value
            }
        })
    }
    

    render() {
        let product = this.state.products
        const { collapseID, collapseID2, search } = this.state;
        console.log(search)
        let cariStr = search.searchString.trim().toLowerCase();
        let minimal = parseInt(search.min)
        let maksimal = parseInt(search.max)
        
        if (search || search.min || search.max) {
            product = product.filter(function(item) {
                // return item.name.toLowerCase().includes(search)
                if(isNaN(minimal) && isNaN(maksimal)){ // Search by Name
                    return (
                        item.name.toLowerCase().includes(cariStr)
                    )
                } else if (isNaN(minimal)){ // Name and Max
                    return (
                        item.name.toLowerCase().includes(cariStr)
                        &&
                        item.price <= maksimal
                    )
                } else if(isNaN(maksimal)){ // Name and Min
                    return (
                        item.name.toLowerCase().includes(cariStr)
                        &&
                        item.price >= minimal
                    )
                } else {            // Name & Min & Max
                    return (
                        // Semua string itu mengandung string kosong (true)
                        item.name.toLowerCase().includes(cariStr)
                        &&
                        item.price >= minimal
                        &&
                        item.price <= maksimal
                    )
                }
            });
        }
        if(this.state.checkedItems.length > 0) {
            console.log(product)
            // this.state.checkedItems.forEach(data => {
            //     product = product.filter(item => {
            //         return item.brand_id === parseInt(data)
            //     })

            // })
            product = product.filter(item => {
                return this.state.checkedItems.includes(String(item.brand_id))
            })
        } 
        
        return (
            <div className="container mt-5">
                <div className="row">
                <MDBCol lg="3" md="2" className="mb-lg-0 mb-4">
                    <div className="card">
                        <div className="card-header" onClick={this.toggleCollapse("collapse1")}>
                            Brands
                            <i className={ collapseID==="collapse1" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
                        </div>
                        <MDBCollapse id="collapse1" isOpen={collapseID}>
                            <div className="card card-body">
                            <form>
                                {this.renderBrand()}
                            </form>
                            </div>
                        </MDBCollapse>
                    </div>
                    <div className="card">
                        <div className="card-header" onClick={this.toggleCollapse2("collapse2")}>
                            Search
                            <i className={ collapseID2==="collapse2" ? "fa fa-angle-down rotate-icon" : "fa fa-angle-down" } />
                        </div>
                        <MDBCollapse id="collapse2" isOpen={collapseID2}>
                            <div className="card card-body">
                            <label>Barang</label>
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" name="searchString" value={search.searchString} onChange={this.handleChange}/>
                                
                            <div className="form-group">
                                <label>Min</label>
                                <input type="number" className="form-control" placeholder="Rp" name="min" value={search.min} onChange={this.handleChange}/>
                            </div>
                            <div className="form-group">
                                <label>Max</label>
                                <input type="number" className="form-control" placeholder="Rp" name="max" value={search.max} onChange={this.handleChange}/>
                            </div>
                            </div>
                        </MDBCollapse>
                    </div>
                </MDBCol>
                    <div className="col-9">
                    <div className="row">
                        {this.renderProduct(product)}
                       
                    </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default ShopCategory;



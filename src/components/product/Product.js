import React, { Component } from 'react'
import {Link, Redirect} from 'react-router-dom';
import { MDBIcon } from "mdbreact";
import './Product.css'
import axios from '../../config/axios';
import {connect} from 'react-redux'
import { getCart } from '../../actions/index'
import Swal from 'sweetalert2';
import { MDBContainer, MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import {  MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBadge } from "mdbreact";
import CekOngkir from './CekOngkir'
import Review from './Review';
import Rating from 'react-rating'

class Product extends Component {

    state = {
        productDetail: {},
        size: [],
        quantity: 1,
        size_id: "",
        redirect: false,
        activeItem: "1",
        relatedProducts: []
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
            this.setState({
                activeItem: tab
            });
        }
    };

    increment = () => {
        if(this.state.productDetail.stock > this.state.quantity) {
            this.setState({quantity: this.state.quantity + 1})
        }
    }
    decrement = () => {
        if(this.state.quantity > 1) {
            this.setState({quantity: this.state.quantity - 1})
        }
    }

    getProductDetail = async() => {
        try {
            console.log(this.props)
           const res = await axios.get(`/get-products/${this.props.match.params.id}`)
            // console.log(res.data)
           this.setState({productDetail: res.data[0]})
        } catch (error) {
            console.log(error)
        }
        // console.log(this.props)
    }

    getSize = async () => {
        try {
            const res = await axios.get(`/size`)
            this.setState({size: res.data})
        } catch (error) {
            console.log(error)
        }
    }


    async componentDidMount() {
        await this.getProductDetail()
        this.getSize()
        this.getRelatedProducts()
    }

    renderSize = () => {
        return this.state.size.map(item => {
            return (
                <option value={item.id}>{item.size_name}</option>
            )
        })
    }

    addToCart = async () => {
        // console.log(!this.props.user.isAdmin)
        
        if(!this.props.user.isAdmin && this.props.user.username) {
            if(this.state.size_id){
                try {
                    const res = await axios.get(`/get-cart-user/${this.props.user.id}/${this.state.productDetail.id}/${this.state.size_id}`)
                    if(res.data.length > 0) {
                        const resPatch = await axios.patch(`/carts/${res.data[0].id}`, {quantity: parseInt(res.data[0].quantity) + parseInt(this.state.quantity)})
                        // console.log(resPatch)
                        Swal.fire(
                            'Ditambahkan',
                            'You clicked the button!',
                            'success'
                        )
                    } else {
                        const resPost = await axios.post('/carts', {
                            product_id: this.state.productDetail.id,
                            user_id: this.props.user.id,
                            size_id: this.state.size_id,
                            quantity: this.state.quantity
                        })
                        if(resPost.data.length > 0) {
                            this.props.getCart(this.props.user.id)
                            Swal.fire(
                                'Ditambahkan',
                                'You clicked the button!',
                                'success'
                            )
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } else {
            this.setState({redirect: true})
        }
    }

    getRelatedProducts = async () => {
        try {
            const res = await axios.get(`/products-related/${this.state.productDetail.category_id}/${this.props.match.params.id}`)
            this.setState({relatedProducts: res.data})
        } catch (error) {
            console.log(error)
        }
    }

    renderrelatedProducts= () => {
        return this.state.relatedProducts.map(item => {
            return (
                <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
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

    render() {
        const { productDetail, quantity, size_id, redirect } = this.state
        
        if(redirect) return <Redirect to="/login"></Redirect>
        return (
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-5 ">
                        <div className="card">
                            <img className="card-img-top" src={`http://localhost:2019/products/image/${productDetail.image}`} style={{width: '445px'}} alt="Card image cap"/>
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className="card" style={{border: "none"}}>
                            <div className="card-body" style={{fontFamily: 'Patua One'}}>
                                <h2 className="card-title">{productDetail.name}</h2>
                                <h4 className="mt-3 mb-4">IDR {parseInt(productDetail.price).toLocaleString('IN') }</h4>
                                {/* < div className="card-text">
                                {productDetail.description}
                                </div> */}
                                <label>Size</label>
                                <select className="custom-select mb-4" value={size_id} onChange={(event) => this.setState({size_id: event.target.value})}>
                                    <option value="">Choose your size</option>
                                    {this.renderSize()}
                                </select>
                                {/* <h5 className="mt-4">Stock</h5> */}
                                {/* <i className="fas fa-plus-square fa-2x" style={{cursor: 'pointer'}} onClick={this.decrement}></i> */}
                                <label>Quantity</label><br></br>
                                <div className="btn-group mb-4">
                                    <button type="button" className="btn btn-dark btn-sm" onClick={this.decrement}>-</button>
                                    <input type="text" style={{width: '65px'}} className="text-center" value={quantity} onChange={(event) => this.setState({quantity: parseInt(event.target.value)})} disabled></input>
                                    <button type="button" className="btn btn-dark btn-sm" onClick={this.increment}>+</button>
                                </div>
                                <p>Rating: <Rating 
                                    emptySymbol="fa fa-star-o fa-md"
                                    fullSymbol="fa fa-star fa-md"
                                    // initialRating={this.state.rating}
                                    // onChange={(rate) => this.setState({rating: rate})}
                                /></p>
                                {/* <h5>Stock: {productDetail.stock}</h5> */}
                                <button type="button" className="btn btn-dark btn-sm mt-3 btn-block" onClick={this.addToCart}>ADD TO CART</button>
                                <button type="button" className="btn btn-dark btn-sm mt-3 btn-block" onClick={this.addToCart}>ADD TO WISHLIST</button>
                                {/* <button type="button" className="btn btn-dark btn-sm mt-2 btn-block" >ADD TO WHISLIST</button> */}
                                

                                {/* <p className="card-text">Category</p> */}
                            </div>
                        </div>
                    </div>
                </div>

                <MDBNav className="nav-tabs mt-5 justify-content-center">
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                            <span className='grey-text'>Information</span>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                            <span className='grey-text'>Review</span>
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink to="#" active={this.state.activeItem === "3"} onClick={this.toggle("3")} role="tab" >
                            <span className='grey-text'>Cek Ongkir</span>
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel" style={{height: '150px'}}>
                        <p className="mt-2">
                            {productDetail.description}
                        </p>
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        <Review idUser={this.props.user.id} idProduct={this.props.match.params.id}/>
                    </MDBTabPane>
                    <MDBTabPane tabId="3" role="tabpanel">
                    <p className="h4 mt-3 mb-3">Tujuan Pengiriman</p>
                        <CekOngkir />
                    </MDBTabPane>
                </MDBTabContent>
                <hr/>
                <p className="h5 mt-4"><strong>You may also like</strong></p>
                <div className="text-center mt-4">
                    <MDBRow>
                        {this.renderrelatedProducts()}
                    </MDBRow>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.auth
    }
}
export default connect(mapStateToProps, {getCart})(Product)

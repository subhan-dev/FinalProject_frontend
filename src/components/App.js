import React, { Component, Fragment } from 'react';
import { Route, BrowserRouter } from 'react-router-dom'
import cookies from 'universal-cookie'
import { connect } from 'react-redux'

import Register from './auth/Register'
import Login from './auth/Login'
import Home from './home/Home'
import Header from './header/Header'
import Footer from './footer/Footer'
import Shop from './shop/Shop'
import Product from './product/Product'
import Cart from './order/Cart'
import Checkout from './order/Checkout'
import ListOrder from './order/ListOrder'
import PaymentUpload from './order/PaymentUpload'
import Profile from './profile/Profile'
import ShopCategory from './shop/ShopCategory'
import DetailListOrder from './order/DetailListOrder'

import { keepLogin, getCart } from '../actions/index'

import ManageProduct from './admin/manageproduct/ManageProduct'
import AddProduct from './admin/manageproduct/AddProduct'
import EditProduct from './admin/manageproduct/EditProduct'
import ManageStock from './admin/managestock/ManageStock'
import ManageCategory from './admin/managecategory/ManageCategory'
import ManageOrder from './admin/manageorder/ManageOrder'
import HistoryTransaksi from './admin/historytransaksi/HistoryTransaksi'
import DetailHistory from './admin/historytransaksi/DetailHistory'

const cookie = new cookies()

class App extends Component {

    componentWillMount(){
        const user = cookie.get('user')
        // console.log(user)

        if(user !== undefined){
            this.props.keepLogin(user)
            this.props.getCart(user.id)
        }
    }

    // componentDidMount() {
    //     if(user !== undefined){
    //         this.props.getCart(user.id)
    //     }
    // }

    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={Login}/> 
                        <Route path="/register" component={Register}/>
                        <Route path="/all-shop" component={Shop}/>
                        <Route path="/shop-category/:id" component={ShopCategory}/>
                        <Route path="/product-detail/:id" component={Product}/>
                        <Route path="/cart" component={Cart}/>
                        <Route path="/checkout" component={Checkout}/>
                        <Route path="/list-order" component={ListOrder}/>
                        <Route path="/payment-upload/:order_id" component={PaymentUpload}/>
                        <Route path="/profile" component={Profile}/>
                        <Route path="/detail-list-order/:id" component={DetailListOrder}/>

                        <Route path="/manage-product" component={ManageProduct}/>
                        <Route path="/add-product" component={AddProduct}/>
                        <Route path="/edit-product/:id" component={EditProduct}/>
                        <Route path="/manage-stock" component={ManageStock}/>
                        <Route path="/manage-category" component={ManageCategory}/>
                        <Route path="/manage-order" component={ManageOrder}/>
                        <Route path="/history-transaksi" component={HistoryTransaksi}/>
                        <Route path="/detail-history/:id" component={DetailHistory}/>
                        <Footer />
                        {/* <Route path="/productdetail" component={ProductDetail}/> */}
                        {/* <Footer /> */}
                    </div>
                </BrowserRouter>
            </Fragment>
        )
    }
}

export default connect(null, { keepLogin, getCart })(App)
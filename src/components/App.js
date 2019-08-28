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

import { keepLogin } from '../actions/index'

import ManageProduct from './admin/manageproduct/ManageProduct'
import AddProduct from './admin/manageproduct/AddProduct'
import EditProduct from './admin/manageproduct/EditProduct'

const cookie = new cookies()

class App extends Component {

    componentWillMount(){
        const user = cookie.get('user')
        // console.log(user)

        if(user !== undefined){
            this.props.keepLogin(user)
        }
    }

    render() {
        return (
            <Fragment>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route path="/" exact component={Home}/>
                        <Route path="/login" component={Login}/> 
                        <Route path="/register" component={Register}/>
                        <Route path="/shop" component={Shop}/>
                        <Route path="/product" component={Product}/>

                        <Route path="/manage-product" component={ManageProduct}/>
                        <Route path="/add-product" component={AddProduct}/>
                        <Route path="/edit-product/:id" component={EditProduct}/>
                        <Footer />
                        {/* <Route path="/productdetail" component={ProductDetail}/> */}
                        {/* <Footer /> */}
                    </div>
                </BrowserRouter>
            </Fragment>
        )
    }
}

export default connect(null, { keepLogin })(App)
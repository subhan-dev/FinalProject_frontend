import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import {connect} from 'react-redux'

import {Navbar, NavDropdown, Nav, Button} from 'react-bootstrap'

import { onLogout } from '../../actions/index'

import './Header.css'
import axios from '../../config/axios';

class Header extends Component {

    state = {
        category: []
    }
    componentDidMount() {
        this.getCategory()
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
    renderCategory = () => {
        return this.state.category.map(item => {
            return (
                <NavDropdown.Item key={item.id} as={Link} to={`/shop-category/${item.id}`}>{item.name_category}</NavDropdown.Item>
            )
        })
    }
    render() {
        const { username, isAdmin } = this.props.user
        console.log(isAdmin === 1)
        if(username === '' && isAdmin === false) {
            return (
                <Navbar expand="lg" >
                    <Navbar.Brand className="header-text" as={Link} to='/'> Clothing Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto ml-auto nav-text">
                            <Nav.Link className="text-secondary" as={Link} to='/'>HOME</Nav.Link>
                            <NavDropdown title="SHOP" >
                                <NavDropdown.Item as={Link} to='/all-shop'>All</NavDropdown.Item>
                                {this.renderCategory()}
                            </NavDropdown>
                            <Nav.Link className="text-secondary" as={Link} to='/howtoorder'>HOW TO ORDER</Nav.Link>
                        </Nav>
                        <Nav.Link className="text-secondary nav-text" as={Link} to='/login'>LOGIN</Nav.Link>/
                        <Nav.Link className="text-secondary nav-text"  as={Link} to='/register'>REGISTER</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            )
        } else if(username !== '' && isAdmin === 0) {
            return (
                <Navbar expand="lg" >
                    <Navbar.Brand className="header-text" as={Link} to='/'>Clothing Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto ml-auto nav-text">
                        <Nav.Link className="text-secondary" as={Link} to='/profile'>PROFILE</Nav.Link>
                            <Nav.Link className="text-secondary" as={Link} to='/'>HOME</Nav.Link>
                            <NavDropdown title="SHOP" >
                            <NavDropdown.Item as={Link} to='/all-shop'>All</NavDropdown.Item>
                                {this.renderCategory()}
                            </NavDropdown>
                            <Nav.Link className="text-secondary" as={Link} to='/howtoorder'>HOW TO ORDER</Nav.Link>
                        </Nav>
                        <Nav.Link className="text-secondary nav-text" as={Link} to='/cart'>
                            <i className="fa fa-shopping-cart mr-1" style={{fontSize:'1.2em'}}></i><span>0</span>
                        </Nav.Link>
                        <Nav.Link className="text-secondary nav-text" onClick={this.props.onLogout}>LOGOUT</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            )
        } else {
            return (
                <Navbar expand="lg" >
                    <Navbar.Brand className="header-text" as={Link} to='/'>Clothing Store</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto ml-auto nav-text">
                            <Nav.Link className="text-secondary" as={Link} to='/manage-product'>Manage Product</Nav.Link>
                            <Nav.Link className="text-secondary" as={Link} to='/manage-category'>Manage Category</Nav.Link>
                            <Nav.Link className="text-secondary" as={Link} to='/manage-order'>Manage Order</Nav.Link>
                            <Nav.Link className="text-secondary" as={Link} to='/history-transaksi'>History Transaksi</Nav.Link>
                            {/* <Nav.Link className="text-secondary" as={Link} to='/manage-stock'>Manage Stock</Nav.Link> */}
                        </Nav>
                        <Nav.Link className="text-secondary nav-text" onClick={this.props.onLogout}>LOGOUT</Nav.Link>
                    </Navbar.Collapse>
                </Navbar>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth
    }
}

export default connect(mapStateToProps, { onLogout })(Header)

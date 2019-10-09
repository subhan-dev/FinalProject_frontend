import React, { Component } from 'react'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact"
import {  MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBadge } from "mdbreact";
import './Home.css'
import slider from './slider.jpg'
import slider2 from './slider2.jpg.jpg'
import slider3 from './slider3.jpg'
import axios from '../../config/axios';
import { Link } from 'react-router-dom';

class Home extends Component {

    state = {
        newArrival: [],
        bestSeller: []
    }
    getNewArrival = async() => {
        try {
            const res = await axios.get('/productsNew')
            this.setState({newArrival: res.data})
        } catch (error) {
            console.log(error)
        }
    }
    getBestSeller = async() => {
        try {
            const res = await axios.get('/products-bestseller')
            this.setState({bestSeller: res.data})
        } catch (error) {
            console.log(error)
        }
    }

    componentDidMount() {
        this.getNewArrival()
        this.getBestSeller()
    }

    renderNewArrival = () => {
        return this.state.newArrival.map(item => {
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
    renderBestSeller = () => {
        return this.state.bestSeller.map(item => {
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
        return (
            <div className="mt-4">
            <MDBCarousel
                activeItem={1}
                length={3}
                showControls={true}
                showIndicators={true}
                className="z-depth-1"
            >
                <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                    <MDBView>
                    <img
                        className="d-block w-100"
                        src={slider3}
                        alt="First slide"
                    />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                    <MDBView>
                    <img
                        className="d-block w-100"
                        src={slider2}
                        alt="Second slide"
                    />
                    </MDBView>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                    <MDBView>
                    <img
                        className="d-block w-100"
                        src={slider3}
                        alt="Third slide"
                    />
                    </MDBView>
                </MDBCarouselItem>
                </MDBCarouselInner>
            </MDBCarousel>

            <hr className="hr-text" style={{marginTop: '100px'}} data-content="New Arrivals" />
            <div className="container">
                <section className="text-center my-5">
                    <MDBRow>
                        {this.renderNewArrival()}
                    </MDBRow>
                </section>
            </div>
            <hr className="hr-text mt-5" data-content="Best Seller" />
            <div className="container">
                <section className="text-center my-5">
                    <MDBRow>
                        {this.renderBestSeller()}
                    </MDBRow>
                </section>
            </div>
            </div>
        )
    }
}

export default Home

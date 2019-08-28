import React, { Component } from 'react'
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView, MDBContainer } from
"mdbreact"
import {  MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBadge } from "mdbreact";
import './Home.css'
import slider from './slider.jpg'
import slider2 from './slider2.jpg.jpg'
import slider3 from './slider3.jpg'

class Home extends Component {

    EcommercePage = () => {
        return (
            <section className="text-center my-5">
                <MDBRow>
                    <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
                        <MDBCard className="align-items-center">
                        <MDBCardImage
                            src="https://shiningbright.co.id/wp-content/uploads/2019/07/tshirt_0331.jpg"
                            top
                            alt="sample photo"
                            overlay="white-slight"
                        />
                        <MDBCardBody className="text-center">
                            <strong>
                                <a href="#!" className="dark-grey-text">
                                Denim shirt{" "}
                                </a>
                            </strong>
                            <h6 className="font-weight-bold blue-text">
                                120$
                            </h6>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
                        <MDBCard className="align-items-center">
                        <MDBCardImage
                            src="https://shiningbright.co.id/wp-content/uploads/2019/07/tshirt_0331.jpg"
                            top
                            alt="sample photo"
                            overlay="white-slight"
                        />
                        <MDBCardBody className="text-center">
                            <strong>
                                <a href="#!" className="dark-grey-text">
                                Denim shirt{" "}
                                </a>
                            </strong>
                            <h6 className="font-weight-bold blue-text">
                                120$
                            </h6>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
                        <MDBCard className="align-items-center">
                        <MDBCardImage
                            src="https://shiningbright.co.id/wp-content/uploads/2019/07/tshirt_0331.jpg"
                            top
                            alt="sample photo"
                            overlay="white-slight"
                        />
                        <MDBCardBody className="text-center">
                            <strong>
                                <a href="#!" className="dark-grey-text">
                                Denim shirt{" "}
                                </a>
                            </strong>
                            <h6 className="font-weight-bold blue-text">
                                120$
                            </h6>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                    <MDBCol lg="3" md="6" className="mb-lg-0 mb-4">
                        <MDBCard className="align-items-center">
                        <MDBCardImage
                            src="https://shiningbright.co.id/wp-content/uploads/2019/07/tshirt_0331.jpg"
                            top
                            alt="sample photo"
                            overlay="white-slight"
                        />
                        <MDBCardBody className="text-center">
                            <strong>
                                <a href="#!" className="dark-grey-text">
                                Denim shirt{" "}
                                </a>
                            </strong>
                            <h6 className="font-weight-bold blue-text">
                                120$
                            </h6>
                        </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </section>
        );
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

            <hr className="hr-text mt-5" data-content="New Arrivals" />
            <div className="container">
                {this.EcommercePage()}
            </div>
            <hr className="hr-text mt-5" data-content="Best Seller" />
            <div className="container">
                {this.EcommercePage()}
            </div>
            </div>
        )
    }
}

export default Home

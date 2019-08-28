import React, { Component } from "react";
import { MDBCollapse, Button } from "mdbreact";
import {  MDBRow, MDBCol, MDBCard, MDBCardImage, MDBCardBody, MDBBadge, MDBCollapseHeader } from "mdbreact";

class Shop extends Component {
    state={
        collapseID: "",
        collapseID2: ""
    }

    toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
        collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));
    toggleCollapse2 = collapseID2 => () =>
    this.setState(prevState => ({
        collapseID2: prevState.collapseID2 !== collapseID2 ? collapseID2 : ""
    }));
    

    render() {
        const { collapseID, collapseID2 } = this.state;
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
                                <label className="form-check">
                                    <input className="form-check-input" type="checkbox" value=""/>
                                    <span className="form-check-label">
                                        Shining Bright
                                    </span>
                                </label> 
                                <label className="form-check">
                                    <input className="form-check-input" type="checkbox" value=""/>
                                    <span className="form-check-label">
                                        Cosmic
                                    </span>
                                </label> 
                                <label className="form-check">
                                    <input className="form-check-input" type="checkbox" value=""/>
                                    <span className="form-check-label">
                                        RSCH
                                    </span>
                                </label> 
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
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <div className="form-row mt-3">
                                    <div className="form-group col-md-6">
                                        <label>Min</label>
                                        <input type="number" className="form-control" id="inputEmail4" placeholder="$0"/>
                                    </div>
                                    <div className="form-group col-md-6 text-right">
                                        <label>Max</label>
                                        <input type="number" className="form-control" placeholder="$1,0000"/>
                                    </div>
                                </div>
                            </div>
                        </MDBCollapse>
                    </div>
                </MDBCol>
                    <div className="col-9">
                    <div className="row">
                        <MDBCol lg="4" className="mb-lg-5 mb-4">
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
                        <MDBCol lg="4" className="mb-lg-0 mb-4">
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
                        <MDBCol lg="4" className="mb-lg-0 mb-4">
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
                        <MDBCol lg="4" className="mb-lg-0 mb-4">
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
                        <MDBCol lg="4" className="mb-lg-0 mb-4">
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
                    </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default Shop;



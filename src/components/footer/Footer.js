import React from "react";
import './Footer.css'

const Footer = () => {
    return (
        <section id="footer" className="bg-light mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-5">
                        <ul className="list-unstyled list-inline social text-center">
                            <li className="list-inline-item"><a href="#"><i className="fa fa-facebook"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fa fa-twitter"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fa fa-instagram"></i></a></li>
                            <li className="list-inline-item"><a href="#"><i className="fa fa-envelope"></i></a></li>
                        </ul>
                    </div>
                    <hr/>
                </div>	
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 mt-2 mt-sm-2 text-center text-dark">
                        <ul className="list-unstyled list-inline social text-center">
                            <li className="list-inline-item">Home |</li>
                            <li className="list-inline-item">Shop |</li>
                            <li className="list-inline-item">How to order |</li>
                            <li className="list-inline-item">About</li>
                        </ul>
                        <p className="h6">@Copyright 2019</p>
                    </div>
                    <hr/>
                </div>	
            </div>
        </section>
    );
}

export default Footer;
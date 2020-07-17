import React, { Component } from 'react';
import Categories from '../categories/Categories';


class Customer extends Component {

    render(){
    return(
        <>
        <div className="container">
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner mb-5">
                    <div className="carousel-item active">
                        <img className="d-inline mx-auto w-100" src={require('./images/i1.jpg')} alt="First slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-inline mx-auto w-100" src={require('./images/i3.jpg')} alt="Second slide"/>
                    </div>
                    <div className="carousel-item">
                        <img className="d-inline mx-auto w-100" src={require('./images/i2.jpg')} alt="Third slide"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
            <Categories/>
        </div>
        </>
    )
    }
}

export default Customer;
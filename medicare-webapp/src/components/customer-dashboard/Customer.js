import React, { Component } from 'react';
import Categories from '../categories/Categories';

class Customer extends Component {

    render(){
        return(
            <div className="container">
                <div id="carouselControls" className="carousel slide mb-3" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img className="d-inline mx-auto w-100" src={require('../../assets/images/2.png')} alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-inline mx-auto w-100" src={require('../../assets/images/1.png')} alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-inline mx-auto w-100" src={require('../../assets/images/3.jpg')} alt="Third slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-inline mx-auto w-100" src={require('../../assets/images/4.jpg')} alt="Fourth slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-inline mx-auto w-100" src={require('../../assets/images/6.jpg')} alt="Fifth slide"/>
                        </div>
                        <div className="carousel-item">
                            <img className="d-inline mx-auto w-100" src={require('../../assets/images/5.jpg')} alt="Sixth slide"/>
                        </div>
                    </div>
                    <a className="carousel-control-prev" href="#carouselControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
                <Categories/>
            </div>
        )
    }
}

export default Customer;
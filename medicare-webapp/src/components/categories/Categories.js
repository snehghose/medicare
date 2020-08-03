import React, { Component } from 'react';
import Category from './category/Category';
import CategoryService from '../services/CategoryService';

class Categories extends Component{
    state={categories:[]};

    async componentDidMount(){
        console.log(await CategoryService.getAllCategories())
        this.setState({categories:await CategoryService.getAllCategories()})
    }

    render() {
        return (
            <div className="container">
                <div className="my-5">
                    <h3>Categories</h3>
                </div>
                <div className="row">
                    {this.state.categories.map(category=>(
                        <div key={category.id} className="col-12 col-sm-6 col-lg-4">
                            <Category key={category.id} category={category}/>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Categories;
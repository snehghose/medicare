import React, { Component } from 'react';
import Category from './category/Category';
import CategoryService from '../services/CategoryService';

class Categories extends Component{
    state={categories:[]};
    //abortController=new AbortController()

    async componentDidMount(){
        this.setState({categories:await CategoryService.getAllCategories()})
    }

    // componentWillUnmount(){
    //     this.abortController.abort()
    // }

    render() {
        return (
            <div className="container my-5">
                <div className="my-3">
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
import React, { Component } from 'react';
import Category from './category/Category';

class Categories extends Component{
    state={categories:[]};
    abortController=new AbortController()

    async componentDidMount(){
        await fetch('http://localhost:8082/category')
        .then(response=>response.json())
        .then(json=>this.setState({categories:json}))
        .catch(error=>alert(error.message));

    }

    componentWillUnmount(){
        this.abortController.abort()
    }

    render() {
        return (
            <div className="container mb-2">
                <div>
                    <h5>Categories</h5>
                </div>
                {this.state.categories.map(category=>(
                    <Category key={category.id} category={category}/>
                ))}
        </div>
        )
    }
}

export default Categories;
import React from 'react';
import AuthService from './AuthService';

const URI = "http://localhost:8082/product";

class ProductService {

    async getProductsByCategory(categoryName) {
        const response = await fetch(URI+`/${categoryName}`);
        var products=[]
        if(response.status===200)
        products= await response.json();
        else {
            alert("Cannot fetch. Please refresh.")
            window.location.reload(false)
        }
        return products;
    }

    async getAllProducts() {
        const response = await fetch(URI);
        if(response.status===200)
        return await response.json()
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async addProduct(product) {
        const response=await fetch(URI, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
        if(response.status!=200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async updateProduct(product) {
        const response=await fetch(URI, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
        if(response.status!=200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async deleteProduct(id) {
        const response=await fetch(URI+`/${id}`, {
            method:'DELETE'
        })
        if(response.status!=200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async getDiscountedProducts() {
        const response=await fetch(URI+'/discount');
        if(response.status===200)
        return await response.json();
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async getNonDiscountedProducts() {
        const response=await fetch(URI+'/no-discount');
        if(response.status===200)
        return await response.json();
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    displayMessage() {
        document.getElementById('message').innerHTML="Added to Cart successfully";
        setTimeout(function(){document.getElementById('message').innerHTML=""},3000);
    }
}

export default new ProductService();
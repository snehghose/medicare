import React from 'react';

const URI = "http://localhost:8082/product";

class ProductService {

    async getProductsByCategory(categoryName) {
        const response = await fetch(URI+`/${categoryName}`);
        var products=[]
        if(response.status===200)
        products= await response.json();
        else
        alert(response.statusText)
        return products;
    }

    async getAllProducts() {
        const response = await fetch(URI);
        if(response.status===200)
        return await response.json()
        else
        alert(response.statusText)
    }

    async addProduct(product) {
        await fetch(URI, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
    }

    async updateProduct(product) {
        await fetch(URI, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(product)
        })
    }

    async deleteProduct(id) {
        await fetch(URI+`/${id}`, {
            method:'DELETE'
        })
    }

    async getDiscountedProducts() {
        const response=await fetch(URI+'/discount');
        if(response.status===200)
        return await response.json();
        else
        alert(response.statusText)
    }

    async getNonDiscountedProducts() {
        const response=await fetch(URI+'/no-discount');
        if(response.status===200)
        return await response.json();
        else
        alert(response.statusText)
    }
}

export default new ProductService();
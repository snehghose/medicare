import React from 'react';

const URI="http://localhost:8082/category";

class CategoryService {

    async getAllCategories() {
        const response=await fetch(URI);
        if(response.status===200)
        return await response.json();
        else
        alert(response.statusText)
    }

    async updateCategory(category) {
        await fetch(URI, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(category)
        })
    }

    async addCategory(category) {
        await fetch(URI, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(category)
        })
    }

    async deleteCategory(id) {
        await fetch(URI+`/${id}`, {
            method:'DELETE'
        })
    }
}

export default new CategoryService();
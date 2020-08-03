import AuthService from './AuthService';

const URI="http://localhost:9000/easymeds-product-service/category";

class CategoryService {

    async getAllCategories() {
        const response=await fetch(URI);
        if(response.status===200)
        return await response.json();
        else {
            alert("Cannot fetch. Please refresh")
            window.location.reload(false)
        }
    }

    async updateCategory(category) {
        const response=await fetch(URI, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(category)
        })
        if(response.status!==200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async addCategory(category) {
        const response=await fetch(URI, {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(category)
        })
        if(response.status!==200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async deleteCategory(id) {
        const response=await fetch(URI+`/${id}`, {
            method:'DELETE'
        })
        if(response.status!==200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }
}

export default new CategoryService();
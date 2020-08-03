import AuthService from './AuthService';

const URI="http://localhost:9000/authentication-service/"

class UserService {

    async getUser(userId) {
        const response=await fetch(URI+`user/${userId}`)
        if(response.status===200)
            sessionStorage.setItem('user',JSON.stringify(await response.json()))
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async updateUser() {
        const user=JSON.parse(sessionStorage.getItem('user'))
        const response=await fetch(URI+'customer',{
            method:'PUT', 
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            },
            body:JSON.stringify(user)
        })
        if(response.status===200)
        return true
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async updatePassword(password) {
        const userId=JSON.parse(sessionStorage.getItem('user')).userId;
        const response=await fetch(URI+`user/${userId}`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            },
            body:JSON.stringify(password)
        })
        if(response.status===200)
        return await response.json()
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }

    }

    async getAllEmployees() {
        const response=await fetch(URI+"employee", {
            headers: {
                'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            }
        });
        if(response.status===200)
        return await response.json();
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async deleteUser(userId) {
        const response = await fetch(URI+`employee/${userId}`, {
            method:'DELETE',
            headers:{
                'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            }
        });
        if(response.status!==200) {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async addEmployee(employee) {
        const response=await fetch(URI+"employee", {
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            },
            body:JSON.stringify(employee)
        })
        if(response.status===200) 
        return await response.json()
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
    }

    async checkUserId(userId) {
        const response=await fetch(URI+`check/${userId}`);
        if(response.status===200)
        return await response.json();
        else {
            alert("Cannot fetch. Please refresh.");
            window.location.reload(false);
        }
    }

}

export default new UserService();
import React from 'react';

class UserService {

    getUser(userId) {
        fetch(`http://localhost:8082/user/${userId}`)
        .then(response=>response.json())
        .then(json=>{
            sessionStorage.setItem('user',JSON.stringify(json))});
    }

    updateUser() {
        const user=JSON.parse(sessionStorage.getItem('user'))
        fetch('http://localhost:8082/customer',{
            method:'PUT', 
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            },
            body:JSON.stringify(user)
        })
    }

    updatePassword(password) {
        const userId=JSON.parse(sessionStorage.getItem('user')).userId;
        fetch(`http://localhost:8082/user/${userId}`, {
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            },
            body:JSON.stringify(password)
        })
    }

}

export default new UserService();
import React, { Component } from 'react';
import UserService from './UserService';


const API_URL="http://localhost:8082/";

// const User = {
//     userId:'',
//     firstName:'',
//     lastName:'',
//     dateOfBirth:'',
//     contact:'',
//     password:'',
//     role:'',
//     cart:{},
//     bills:[]
// };

// const Auth = { 
//     role:'',
//     token:''
// };


class AuthService extends Component{

    constructor(props) {
        super(props)
        this.login=this.login.bind(this);
        this.logout=this.logout.bind(this);
        this.getCurrentAuth=this.getCurrentAuth.bind(this)
        this.getCurrentUser=this.getCurrentUser.bind(this)
        this.setCurrentUser=this.setCurrentUser.bind(this)
    }
    
    async login(userId, password) {
        return fetch(API_URL+"authenticate",{
            method:'GET',
            headers:{
                'Authorization':'Basic '+btoa(`${userId}:${password}`)
            }
        })
        .then(response=>{
            if(response.status===200)
            return response.json()
            else
            throw Error(response.statusText)
        })
        .then(json=>{
            sessionStorage.setItem('auth',JSON.stringify(json))
            UserService.getUser(userId)
        })
    }

    logout() {
        sessionStorage.setItem('user',JSON.stringify(null));
        sessionStorage.setItem('auth',JSON.stringify(null));
        fetch('http://localhost:8082/logout')
    }

    getCurrentUser() {
        return JSON.parse(sessionStorage.getItem('user'));
    }

    getCurrentAuth() {
        return JSON.parse(sessionStorage.getItem('auth'));
    }

    setCurrentUser(newUser) {
        sessionStorage.setItem('user',JSON.stringify(newUser));
    }

}

export default new AuthService();

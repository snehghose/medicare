import React, { Component } from 'react';
import UserService from './UserService';


const API_URL="http://localhost:9000/authentication-service/";


class AuthService extends Component{

    constructor(props) {
        super(props)
        this.login=this.login.bind(this);
        this.logout=this.logout.bind(this);
        this.getCurrentAuth=this.getCurrentAuth.bind(this)
        this.getCurrentUser=this.getCurrentUser.bind(this)
        this.setCurrentUser=this.setCurrentUser.bind(this)
    }

    async signup(user) {
        const response=await fetch(API_URL+'customer', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(user)});
        if(response.status!==200) {
            alert("Could not sign up. Please try again.")
            window.location.reload(false)
        }
    }
    
    async login(userId, password) {
        const response=await fetch(API_URL+"authenticate",{
            method:'GET',
            headers:{
                'Authorization':'Basic '+btoa(`${userId}:${password}`)
            }
        });
        if(response.status===200) {
            const auth=await response.json()
            sessionStorage.setItem('auth',JSON.stringify(auth))
            await UserService.getUser(userId)
            switch(auth.role) {
                case 'ROLE_CUSTOMER':
                    window.location.replace("/");
                    break;
                case 'ROLE_EMPLOYEE':
                    window.location.replace("/employee");
                    break;
                case 'ROLE_ADMIN':
                    window.location.replace("/manager")
                    break;
                default:
                    window.location.replace("/");
                    break;
            }
        }
        else {
            alert("Invalid UserId/Password")
            window.location.replace('/login')
        }
    }

    logout() {
        sessionStorage.setItem('user',JSON.stringify(null));
        sessionStorage.setItem('auth',JSON.stringify(null));
        fetch(API_URL+'logout')
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

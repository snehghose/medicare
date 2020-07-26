import React from 'react';

function AuthHeader() {
    const authentication=JSON.parse(sessionStorage.getItem('auth'));

    if(authentication && authentication.token) {
        return { 'Authorization': 'Bearer '+authentication.token};
    } else {
        return {};
    }
}

export default AuthHeader;
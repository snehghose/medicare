import AuthService from './AuthService';

const URI="http://localhost:9000/authentication-service/"

class CartService {

    async addItemToCart(productId) {
        const userId=(JSON.parse(sessionStorage.getItem('user'))).userId;
        const response = await fetch(URI+`customer/${userId}/cart/add/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + (JSON.parse(sessionStorage.getItem('auth'))).token
            }
        });
        let json=null;
        if (response.status === 200)
            json=await response.json();
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
            return false;
        }
        sessionStorage.setItem('user', JSON.stringify(json));
        return true;
    }

    async removeItemFromCart(productId) {
        const userId=JSON.parse(sessionStorage.getItem('user')).userId;
        const response = await fetch(URI+`customer/${userId}/cart/remove/${productId}`,{
            method:'PUT',
            headers:{
                'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            }
            })
            let json=null;
            if (response.status === 200)
                json=await response.json();
            else {
                alert("Session Timeout")
                AuthService.logout()
                window.location.replace('/login')
            }
            sessionStorage.setItem('user', JSON.stringify(json));
    }

    async deleteItemFromCart(productId) {
        const userId=JSON.parse(sessionStorage.getItem('user')).userId;
        const response = await fetch(URI+`customer/${userId}/cart/delete/${productId}`,{
                method:'PUT',
            headers:{
                'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            }
            })
            let json=null;
            if (response.status === 200)
                json=await response.json();
            else {
                alert("Session Timeout")
                AuthService.logout()
                window.location.replace('/login')
            }
            sessionStorage.setItem('user', JSON.stringify(json));
    }

    async checkout() {
        const userId=JSON.parse(sessionStorage.getItem('user')).userId;
        const response = await fetch(URI+`customer/${userId}/checkout`, {
            method:'PUT',
            headers:{
                'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            }
        })
        let json=null;
        if (response.status === 200)
            json=await response.json();
        else {
            alert("Session Timeout")
            AuthService.logout()
            window.location.replace('/login')
        }
        sessionStorage.setItem('user', JSON.stringify(json));
    }

    getQuantity(productId) {
        const cart=JSON.parse(sessionStorage.getItem('user')).cart;
        var quantity=0;
        cart.items.forEach(item => {
            if(item.id===productId)
            {
                quantity=item.quantity;
            }
        });
        return quantity;
    }

}

export default new CartService();
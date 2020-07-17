import React from 'react';

class CartService {

    async addItemToCart(productId) {
        const userId=(JSON.parse(sessionStorage.getItem('user'))).userId;
        const response = await fetch(`http://localhost:8082/customer/${userId}/cart/add/${productId}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer ' + (JSON.parse(sessionStorage.getItem('auth'))).token
            }
        });
        let json=null;
        if (response.status === 200)
            json=await response.json();
        else
            throw Error(response.statusText);
        sessionStorage.setItem('user', JSON.stringify(json));
    }

    async removeItemFromCart(productId) {
        const userId=JSON.parse(sessionStorage.getItem('user')).userId;
        const response = await fetch(`http://localhost:8082/customer/${userId}/cart/remove/${productId}`,{
                method:'PUT',
            headers:{
                'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            }
            })
            let json=null;
            if (response.status === 200)
                json=await response.json();
            else
                throw Error(response.statusText);
            sessionStorage.setItem('user', JSON.stringify(json));
            // .catch(error=>{
            //     alert(error.message)
            //     useHistory().push('/login')
            // });
    }

    async deleteItemFromCart(productId) {
        const userId=JSON.parse(sessionStorage.getItem('user')).userId;
        const response = await fetch(`http://localhost:8082/customer/${userId}/cart/delete/${productId}`,{
                method:'PUT',
            headers:{
                'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            }
            })
            let json=null;
            if (response.status === 200)
                json=await response.json();
            else
                throw Error(response.statusText);
            sessionStorage.setItem('user', JSON.stringify(json));
            // .catch(error=>{
            //     alert(error.message)
            //     useHistory().push('/login')
            // });
    }

    async checkout() {
        const userId=JSON.parse(sessionStorage.getItem('user')).userId;
        const response = await fetch(`http://localhost:8082/customer/${userId}/checkout`, {
            method:'PUT',
            headers:{
                'Authorization': 'Bearer '+JSON.parse(sessionStorage.getItem('auth')).token
            }
        })
        let json=null;
        if (response.status === 200)
            json=await response.json();
        else
            throw Error(response.statusText);
        sessionStorage.setItem('user', JSON.stringify(json));
        // .catch(error=>{
        //     alert(error.message)
        //     useHistory().push('/login')
        // })
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
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
}

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]); //Array de productos global

    const handleButtonCart = (cartItem, value) =>{
        const updatedCart = cart.map((quantityItem) => {
                    if (quantityItem.product._id === cartItem.product._id) {
                        if ( (quantityItem.quantity + value) < 1 ) {
                            return { ...quantityItem, quantity: quantityItem.quantity = 1 };
                        } else
                        return { ...quantityItem, quantity: quantityItem.quantity + value }; //inmutables
                    }return quantityItem;
                });
                setCart(updatedCart);
    }

    const [showCart, setShowCart] = useState(false)

    const addToCart = (product) => {
        // console.log(product._id)
        //nos fijamos si ya existe el item en el carrito
        const existingCartItem = cart.find((cartItem) => cartItem.product._id === product._id);
        // console.log(existingCartItem)
        // Item esta en el carrito; 
        if (existingCartItem) {

            return cart;
                // const updatedCart = cart.map((cartItem) => {
                //     if (cartItem._id === product._id) {
                //         return { ...cartItem, quantity: cartItem.quantity + 1 }; //inmutables
                //     }
                //     return cartItem;
                // });
                // setCart(updatedCart);
        } 


        else {
            // Item no esta en el carrito;  
            setCart([...cart, { product, quantity: 1 }]);
        }
    }

    const removeFromCart = (cartItem) => {
        //logica para remover un item del carrito
        console.log(cartItem)
        const updatedCart = cart.filter((removeItem) => removeItem.product._id !== cartItem.product._id);
        setCart(updatedCart)
        if(updatedCart.length < 1) setShowCart(false)
    }


    
    return (
        <CartContext.Provider value={{ handleButtonCart, showCart, setShowCart,cart,setCart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

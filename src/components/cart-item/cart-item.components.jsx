import React from "react";
import { CartItemContainer, CartItemImg, ItemDetailContainer } from "./cart-item.styles";
 
const CartItem = ({item:{imageUrl, price, name, quantity}}) =>(
    <CartItemContainer>
        <CartItemImg src={imageUrl} alt='item' />
        <ItemDetailContainer>
            <span>{name}</span>
            <span>{quantity} x ${price}</span>
        </ItemDetailContainer>
    </CartItemContainer>
)

export default CartItem;
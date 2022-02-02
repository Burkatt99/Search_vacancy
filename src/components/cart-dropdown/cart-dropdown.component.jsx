import React from "react";
import CartItem from "../cart-item/cart-item.components";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { useHistory } from "react-router-dom";
import { toggleCartHidden } from "../../redux/cart/cart.actions";
import { CartDropdownButton, CartDropdownContainer, CartItemsContainer, EmptyMessage } from "./cart-dropdown.styles";
import { useDispatch } from "react-redux";

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const history = useHistory();

     return(
    <CartDropdownContainer>
        <CartItemsContainer>
        {
            cartItems.length ? (
                cartItems.map(cartItem => <CartItem key={cartItem.id} item={cartItem}/>)
            ) : (
                <EmptyMessage>Your cart is empty</EmptyMessage>
            )
        }
        </CartItemsContainer>
        <CartDropdownButton onClick={() => {
            history.push('/checkout');
            dispatch(toggleCartHidden());
            }}>GO TO CHECKOUT</CartDropdownButton>
    </CartDropdownContainer>
)}


export default CartDropdown;
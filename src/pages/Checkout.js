//import React from 'react'
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from "../components/CheckoutForm";
import { CartContext } from "../context/cart";
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import React, { useContext } from "react";

const Checkout = () => {
    const stripePromise = loadStripe('pk_test_51HkZczLuZVcBNrAFIFU9WkZjGOhhwmQducpuORnk0o8ACHgZeRXOYJqkyHGSwbtk6wMD3JXDCO1MtVzjnTm9pB39008hX72wXS');

    const history = useHistory();
    const { cart, total, increaseAmount, decreaseAmount } = useContext(CartContext);

    function callIncreaseAmountPushCheckout(id) {
      increaseAmount(id);
      history.push("/pushcheckout")
    }

    function callDecreaseAmountPushCheckout(id, amount) {
      decreaseAmount(id, amount);
      history.push("/pushcheckout")
    }
  
    if (!cart.length) {
      return (
        <h1 className="cart-empty2" style={{width:  850}}>
        <h3 className="cart-empty1">Cannot Checkout. Please add some items to your cart first.</h3>
        </h1>)
    }

    return (
        <section className="checkout-wrapper">
            <AmplifyAuthenticator>
                <Elements stripe={stripePromise}>
                    <section>
                        <h2>Ready To Place Your Order?</h2>
                        <CheckoutForm />
                    </section>
                </Elements>
            </AmplifyAuthenticator>


        {/* Cart HTML Below*/}
        <header>
        <body id="customBlock"></body>
          <h2>Your Cart</h2>
          <h3>Modify Your Cart</h3>
        </header>
        <div className="cart-wrapper">
          {cart.map(({ id, title, price, image, amount }) => (
            <article key={id} className="cart-item">
              <div className="image">
                <img src={image} alt="cart item" />
              </div>
              <div className="details">
                <p>{title}</p>
                <p>$ {price}</p>
              </div>
              <div className="amount">
                <button onClick={() => callIncreaseAmountPushCheckout(id)}><FiChevronUp /></button>
                <p>{amount}</p>
                <button onClick={() => callDecreaseAmountPushCheckout(id, amount)}><FiChevronDown /></button>
              </div>
            </article>
          ))}
        </div>
        <div>
        <div className="total">
        <h3 className="total1">&nbsp; Total: $ {total} &nbsp;</h3>
        </div>
          <div>
        {/* <button className="btn1" onClick={() => history.push("/pushcheckout")}>Update Cart</button> */}
          </div>
        </div>
        <body id="customBlock"></body>
        <body id="customBlock"></body>
        <div>
          
        </div>
        </section>

        
    )
}

export default Checkout

import React, { useContext } from "react";
import { CartContext } from "../context/cart";
import { FiChevronUp } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";
import { Route, useHistory } from "react-router-dom";

const PushCheckout = () => {
  const history = useHistory();
  const { cart, total, increaseAmount, decreaseAmount } = useContext(CartContext);

// Push the checkout page
function pushCheckoutPage() {
    history.push("/checkout");
  }

  if (!cart.length) {
    return (
      <h1 className="cart-empty2">
      <h3 className="cart-empty1">Empty Cart. Add some items to your cart first.</h3>
      </h1>)
  }
  return (
    <section className="cart">
      <header>
        <h2>My Updated Cart</h2>
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
              <button onClick={() => increaseAmount(id)}><FiChevronUp /></button>
              <p>{amount}</p>
              <button onClick={() => decreaseAmount(id, amount)}><FiChevronDown /></button>
            </div>
          </article>
        ))}
      </div>
      <div>
        <h3>Total: $ {total}</h3>
      </div>
      <div>
        <button className="btn" onClick={() => history.push("/checkout")}>Checkout</button>
      </div>
      <button type="button" onClick={pushCheckoutPage}>Go home</button>
      <Route>{pushCheckoutPage}</Route>
    </section>
  );
};

export default PushCheckout;

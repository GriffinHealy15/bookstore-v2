import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Amplify
import Amplify from "aws-amplify";

// Pages
import Home from "./pages/Home"
import Error from "./pages/Error";
import Books from "./pages/Books";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import PushCheckout from "./pages/PushCheckout";
import PushAccount from "./pages/PushAccount";
import BookDetails from "./pages/BookDetails";
import Admin from './pages/Admin';
import RInfo from './pages/Account';

// Components
import Header from "./components/Header"

// Amplify Configurations
import awsExports from "./aws-exports";
Amplify.configure(awsExports);


 const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route exact path="/books">
          <Books />
        </Route>
        <Route
          path="/books/:id"
          children={<BookDetails></BookDetails>}>
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/account">
          <RInfo />
        </Route>
        <Route path="/pushcheckout">
          <PushCheckout />
        </Route>
        <Route path="/pushaccount">
          <PushAccount />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

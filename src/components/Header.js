import React from 'react';
import { Link } from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUser, faHome, faShoppingCart, faShoppingBasket, faTv} from '@fortawesome/free-solid-svg-icons';
import Amplify from 'aws-amplify';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';

const Header = () => {
    return (
        <header className="main-head">
            <nav>
                <h1 id="logo">Oasis Shopping</h1>
                <ul>
                    <Link id="customMargin2" to="/">
                    <body id="customMargin3"></body>
                    <li id="headerOptions">
                    <FontAwesomeIcon id="customColor" icon={faHome}/>
                        <Link id="headerColor" to="/"> Home</Link>
                    </li>
                    <body id="customMargin3"></body>
                    </Link>

                    <body id="customMargin"></body>
                    <Link id="customMargin2" to="/books">
                    <body id="customMargin3"></body>
                    <li id="headerOptions">
                    <FontAwesomeIcon id ="customColor" icon={faTv}/>
                        <Link id="headerColor" to="/books"> All Products</Link>
                    </li>
                    <body id="customMargin3"></body>
                    </Link>

                    <body id="customMargin"></body>
                    <Link id="customMargin2" to="/cart">
                    <body id="customMargin3"></body>
                    <li id="headerOptions">
                    <FontAwesomeIcon id="customColor" icon={faShoppingCart}/>
                        <Link id="headerColor" to="/cart"> Current Cart</Link>
                    </li>
                    <body id="customMargin3"></body>
                    </Link>

                    <body id="customMargin"></body>
                    <Link id="customMargin2" to="/checkout">
                    <body id="customMargin3"></body>
                    <li id="headerOptions">
                    <FontAwesomeIcon id="customColor" icon={faShoppingBasket}/>
                        <Link id="headerColor" to="/checkout"> Checkout</Link>
                    </li>
                    <body id="customMargin3"></body>
                    </Link>

                    <body id="customMargin"></body>
                    <Link id="customMargin2" to="/account">
                    <body id="customMargin3"></body>
                    <li id="headerOptions">
                    <FontAwesomeIcon id="customColor" icon={faUser}/>
                        <Link id="headerColor" to="/account"> My Account</Link>
                    </li>
                    <body id="customMargin3"></body>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}

export default Header

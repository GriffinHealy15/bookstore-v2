import React from 'react';
import ReactDOM from 'react-dom';
import { BookProvider } from "./context/books";
import { BookCommentProvider } from "./context/books_comment";
import { BookOrderProvider } from "./context/user_orders";
import App from './App';
import './index.css';
import { CartProvider } from './context/cart';

ReactDOM.render(
  <BookProvider>
    <BookOrderProvider>
      <BookCommentProvider>
        <CartProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </CartProvider>
      </BookCommentProvider>
    </BookOrderProvider>
  </BookProvider>,
  document.getElementById('root')
);

import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { listBookTypes } from "../api/queries";
import { processOrder } from "../api/mutations";

const BookContext = React.createContext();

const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const checkout = async (orderDetails) => {
    var overlay = document.getElementById('overlay');
    overlay.style.display = "inline";
    var overlayOrderSuccess = document.getElementById('overlayOrderSuccess');
    var bgUV1 = document.getElementById('bgUV1');
    var bgUV2 = document.getElementById('bgUV2');

    const payload = {
      id: uuidv4(),
      ...orderDetails
    };
    try {
      //console.log(payload);
      await API.graphql(graphqlOperation(processOrder, { input: payload }));
      console.log("Order is successful");
      overlay.style.display = "none";
      overlayOrderSuccess.style.display = "inline";
      bgUV1.style.display = "flex";
      bgUV2.style.display = "flex";
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBooks = async () => {
    try {
      setLoading(true);
      // Switch authMode to API_KEY for public access
      const { data } = await API.graphql({
        query: listBookTypes,
        authMode: "API_KEY"
      });
      const books = data.listBookTypes.items;
      const featured = books.filter((book) => {
        return !!book.featured;
      });
      setBooks(books);
      setFeatured(featured);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookContext.Provider value={{ books, featured, loading, checkout }}>
      {children}
      <h1 id="overlay" className="overlay"> 
      <div className="bgUV">Processing Order...</div>
      </h1>
      <h1 id="overlayOrderSuccess" className="overlayOrderSuccess">
      <div id="bgUV1" className="bgUV1"> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Order was successful!</div>

      <div id="bgUV2" className="bgUV2">
      <form action="/account">
      <input className="btn6" style={{textTransform: "initial", marginTop: 20, color: "White"}} type="submit" value="Click here to be redirected to your Account and Orders Page!" />
      </form>
      </div>

      </h1>
    </BookContext.Provider>
  );
};

export { BookContext, BookProvider };

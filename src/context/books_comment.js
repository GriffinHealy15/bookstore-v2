import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { listBookCommentTypes } from "../api/queries";
//import { processOrder } from "../api/mutations";

const BookCommentContext = React.createContext();

const BookCommentProvider = ({ children }) => {
  const [bookcomments, setBooks] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      // Switch authMode to API_KEY for public access
      const { data } = await API.graphql({
        query: listBookCommentTypes,
        authMode: "API_KEY"
      });
      const bookcomments = data.listBookCommentTypes.items;
      // const featured = books.filter((book) => {
      //   return !!book.featured;
      // });
      setBooks(bookcomments);
      //setFeatured(featured);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookCommentContext.Provider value={{ bookcomments, loading}}>
      {children}
    </BookCommentContext.Provider>
  );
};

export { BookCommentContext, BookCommentProvider };

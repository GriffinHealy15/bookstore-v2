import React, { useEffect, useState } from "react";
import { API, graphqlOperation } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";
import { listOrderTypes } from "../api/queries";
import { listBookOrderTypes } from "../api/queries";
import { Auth } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
//import { processOrder } from "../api/mutations";
// import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync';
// import awsconfig from '../aws-exports';

const BookOrderContext = React.createContext();

const BookOrderProvider = ({ children }) => {
  const [userorders, setOrders] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Switch authMode to API_KEY for public access
     //const token = (await Auth.currentSession()).idToken.jwtToken;
      const userNameToken = (await Auth.currentUserInfo()).username;

      // Get Orders
      const { data } = await API.graphql({
        query: listOrderTypes,
        authMode: "API_KEY",
      });

      const orders = data.listOrderTypes.items;

      const ordersFilteredByUser = orders.filter((order) => {
        return order.user === userNameToken;
      });

      setOrders(ordersFilteredByUser);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <BookOrderContext.Provider value={{ userorders, loading}}>
      {children}
    </BookOrderContext.Provider>
  );
};

export { BookOrderContext, BookOrderProvider };
export default withAuthenticator(BookOrderProvider);

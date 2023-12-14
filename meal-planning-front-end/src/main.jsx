import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react";
import Router from './components/Router';
import store from "./redux/store"
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);

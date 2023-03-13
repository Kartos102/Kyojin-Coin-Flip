import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import Web3 from "web3/dist/web3.min.js";
import { Web3ReactProvider } from "@web3-react/core";
import { MetaMaskProvider } from "./hooks/useMetaMask";

function getLibrary(provider) {
  return new Web3(provider);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MetaMaskProvider>
    </Web3ReactProvider>
  </React.StrictMode>
);

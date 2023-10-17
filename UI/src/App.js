import "./App.css";
import Router from "./Router";
import React, { createContext, useState } from "react";
import SearchProvider from "./providers/SearchProvider";

function App() {
  return (
    <SearchProvider>
      <Router />
    </SearchProvider>
  );
}

export default App;

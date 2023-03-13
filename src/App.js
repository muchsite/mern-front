import "./App.scss";
import React from "react";
import Home from "./Home/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Single from "./Single/Single";
import { EcomConProvider, UseEcomCon } from "./context";
import { QueryClientProvider, QueryClient } from "react-query";
import Header from "./header/Header";
import Search from "./search/search";
import All from "./All/All";
import Category from "./Category/Category";
import Login from "./login/Login";
import Card from "./Card/Card";
import Price from "./Category/Price";
import Signup from "./login/Signup";

function App() {
  const client = new QueryClient();
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <EcomConProvider>
            <Routes>
              <Route element={<Header />} path="/">
                <Route element={<Home />} path="/" />
                <Route element={<All />} path="/all" />
                <Route element={<Search />} path="/search" />
                <Route element={<Category />} path={`/category`} />
                <Route element={<Price />} path="/price" />
                <Route element={<Single />} path="/single/:id" />
                <Route element={<Login />} path="/login" />
                <Route element={<Signup />} path="/signup" />
                <Route element={<Card />} path="/card" />
              </Route>
            </Routes>
          </EcomConProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Home.scss";
import { UseEcomCon } from "../context";
import { useQuery } from "react-query";
import baner from "../asets/baner.png";
function Home() {
  const { url } = UseEcomCon();
  const { data, isLoading } = useQuery("data", () => {
    return axios.get(`${url}/user/`);
  });
  const navigation = useNavigate();
  return (
    <div className="home_cont">
      <div className="home_body">
        <img src={baner} alt="" />
        <h3>Best solo</h3>
        <h2>Wireless </h2>
        <h1>Headphones</h1>
        <Link to="/all">
          <button>Shop now</button>
        </Link>
      </div>
      <div className="home_products">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <div className="slider_cont">
            <h1>Best selling products</h1>
            <div className="slider">
              {data?.data?.data?.map((item, i) => {
                return (
                  <Link to={`single/${item._id}`} state={{ id: item._id }}>
                    <div className={`slide  slide_${i}`} key={item._id}>
                      <img src={item.image[0]} alt="" />
                      <h2>{item.title}</h2>
                      <h3>{item.price}$</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

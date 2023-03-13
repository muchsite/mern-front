import axios from "axios";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { Link, useSearchParams } from "react-router-dom";
import { UseEcomCon } from "../context";

function Category() {
  const { selectedText, setselectedText, params, setParams, url } =
    UseEcomCon();

  const { data, isLoading } = useQuery(["category", selectedText], () => {
    return axios.get(`${url}/user/category/id/?${params}`);
  });
  const res = data?.data;
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="all_cont">
          {res.map((item, i) => {
            return (
              <div key={i}>
                <Link to={`/single/${item._id}`} state={{ id: item._id }}>
                  <div className="all_item">
                    <div className="item_text">
                      <h1>{item.title}</h1>
                      <h3>Category: {item.category}</h3>
                      <h3>Quantity in stock: {item.storage}</h3>
                      <h3>Price: {item.price}$</h3>
                    </div>
                    <img src={item.image[0]} alt="" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Category;

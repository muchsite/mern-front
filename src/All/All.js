import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import "./all.scss";
function All() {
  const { data, isLoading } = useQuery("all", () => {
    return axios.get("/user/");
  });
  let res = data?.data.data;
  console.log(res);
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
                    <img src={item.image[0]} alt="" />
                    <div className="item_text">
                      <h1>{item.title}</h1>
                      <h3>Category: {item.category}</h3>
                      <h3>Quantity in stock: {item.storage}</h3>
                      <h3>Price: {item.price}$</h3>
                    </div>
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

export default All;

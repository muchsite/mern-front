import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQueries, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { UseEcomCon } from "../context";

function Price() {
  const { to, from, url } = UseEcomCon();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (to && from) {
          const res = await axios.get(
            `${url}/user/price/id/?from=${from}&to=${to}`
          );
          setData(res.data);
        }
        if (!to && from) {
          const res = await axios.get(`${url}/user/price/id/?from=${from}`);
          setData(res.data);
        }
        if (to && !from) {
          const res = await axios.get(`${url}/user/price/id/?to=${to}`);
          setData(res.data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="all_cont">
          {data.map((item, i) => {
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
export default Price;

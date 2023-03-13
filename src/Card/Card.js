import axios from "axios";
import React, { useEffect, useState } from "react";
import "./card.scss";
import { useQuery } from "react-query";
import { UseEcomCon } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft } from "@fortawesome/free-solid-svg-icons";

function Card() {
  const { userId, url } = UseEcomCon();
  const [stateData, setStateData] = useState([]);
  const [isLoading2, setIsLoading2] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading2(true);
      try {
        const data = await axios.post(
          `${url}/card/getcard`,
          {
            id: userId,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        setStateData(data.data[0]?.items);
        setIsLoading2(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const { data, isLoading } = useQuery(["card", userId], () => {
    return axios.post(
      `${url}/card/getcard`,
      { id: userId },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      }
    );
  });
  const res = data?.data[0]?.items;

  const handlePlus = async (title, amount1, i) => {
    setStateData(
      stateData?.map((item, index) => {
        if (index !== i) {
          return item;
        } else {
          return { ...item, amount: item.amount + 1 };
        }
      })
    );
    try {
      const res = await axios.post(
        `${url}/card/addamount`,
        {
          title,
          amount: amount1 + 1,
          createdBy: userId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleMinus = async (title, amount1, i) => {
    if (amount1 < 2) {
      try {
        const res = await axios.post(
          `${url}/card/delete`,
          {
            title,
            createdBy: userId,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          }
        );
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
    setStateData(
      stateData?.map((item, index) => {
        if (index !== i) {
          return item;
        } else {
          return { ...item, amount: item.amount - 1 };
        }
      })
    );
    try {
      const res = await axios.post(
        `${url}/card/addamount`,
        {
          title,
          amount: amount1 - 1,
          createdBy: userId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const deleteItemCard = async (title) => {
    try {
      const res = await axios.post(
        `${url}/card/delete`,
        {
          title,
          createdBy: userId,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const toalArr = stateData
    ?.map((item) => {
      return item.price * item.amount;
    })
    .reduce((a, b) => a + b, 0);

  return (
    <>
      {isLoading2 && isLoading ? (
        <h1>Loading...</h1>
      ) : res?.length < 1 ? (
        <h1>Card is empty</h1>
      ) : (
        <div className="card_cont">
          {res?.map((item, i) => {
            return (
              <div className="card" key={item.id}>
                <img src={item.image} alt="" />
                <div className="card_text">
                  <h2 className="card_title">{item.title}</h2>
                  <p>
                    Price:<span>{item.price}$</span>
                  </p>
                  <div className="quantiti_card">
                    <p>Quantity:</p>
                    <button
                      className="QBTN"
                      onClick={() =>
                        handleMinus(item.title, stateData[i]?.amount, i)
                      }
                    >
                      -
                    </button>
                    <p>{stateData[i]?.amount}</p>
                    <button
                      className="QBTN"
                      onClick={() =>
                        handlePlus(item.title, stateData[i]?.amount, i)
                      }
                    >
                      +
                    </button>
                  </div>
                  <p>
                    Subtotal:
                    <span>{item.price * stateData[i]?.amount}$</span>
                  </p>
                  <button
                    className="delete_item"
                    icon={faDeleteLeft}
                    onClick={() => deleteItemCard(item.title)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
          <div className="total">
            <h2>Total Price:{toalArr}$</h2>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;

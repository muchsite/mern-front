import axios from "axios";
import "./single.scss";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { UseEcomCon } from "../context";
function Single() {
  const { cardAmount, setCardAmount, userId, url } = UseEcomCon();
  const navigation = useNavigate();

  const id = useLocation().state.id;
  const { data, isLoading } = useQuery("single", () => {
    return axios.get(`${url}/user/${id}`);
  });
  const res = data?.data;
  const { data: cardData, isLoading: isLoadingCard } = useQuery(
    ["card", userId],
    () => {
      return axios.post(
        `${url}/card/getcard`,
        { id: userId },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
    },
    {
      enabled: userId ? true : false,
    }
  );
  const card = cardData?.data;

  const handleMinus = () => {
    if (cardAmount > 1) {
      setCardAmount(cardAmount - 1);
    }
  };
  const [imageNumber, setImageNumber] = useState(0);

  const addToCard = async () => {
    if (!card) {
      navigation("/login");
    } else {
      const isInCard = card[0].items.filter((item) => item.id === id);
      if (isInCard.length === 0) {
        const newProduct = {
          title: res.title,
          image: res.image[0],
          amount: cardAmount,
          price: res.price,
          id: id,
        };
        try {
          const response = await axios.post(
            `${url}/card/additem`,
            {
              id: userId,
              newProduct: newProduct,
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
    }
  };
  return (
    <>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="single_cont">
            <div className="single_img">
              <img src={res.image[imageNumber]} alt="" />
              <div className="image_cont">
                {res.image.map((image, i) => {
                  return (
                    <img
                      key={i}
                      src={image}
                      alt=""
                      className={`${imageNumber === i && "active_img"}`}
                      onClick={() => setImageNumber(i)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="single_text">
              <h1>{res.title}</h1>
              <h2> Category: {res.category}</h2>
              <h2>Price: {res.price}$</h2>
              <p>Description: {res.description}</p>
              <div className="single_BTNS">
                <div className="quntity_btn">
                  <FontAwesomeIcon
                    icon={faMinus}
                    className="single_minus"
                    onClick={handleMinus}
                  />
                  <p>{cardAmount}</p>
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="single_plus"
                    onClick={() => setCardAmount(cardAmount + 1)}
                  />
                </div>
                <h1 className="total_price">
                  Total price:{cardAmount * res.price}$
                </h1>
                <button className="add_card" onClick={addToCard}>
                  Add to card
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Single;

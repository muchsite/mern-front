import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

const ecomContext = createContext();

export const EcomConProvider = ({ children }) => {
  const navigation = useNavigate();
  ///logIn
  const [logEmail, setlogEmail] = useState("");
  const [logPassword, setlogPassword] = useState("");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("email"));
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  ///card
  const [cardAmount, setCardAmount] = useState(1);
  const [errMessage, setErrMessage] = useState("");
  ///search
  const [searchText, setSearchText] = useState("");
  const [params, setParams] = useSearchParams();
  const [selectedText, setselectedText] = useState(params.get("category"));
  const [from, setFrom] = useState(params.get("from"));
  const [to, setTo] = useState(params.get("to"));
  const url = process.env.REACT_APP_BACK_URL;
  // console.log(url);
  const { data: cardRes, isLoading: isLoadingCard } = useQuery(
    ["card", userId],
    () => {
      return axios.post(
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
    },
    { enabled: userEmail ? true : false }
  );
  const cardData = cardRes?.data[0];
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.post(`${url}/login/user`, {
        email: logEmail,
        password: logPassword,
      });
      const { token, email: emaill, id } = await data.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("email", emaill);
      localStorage.setItem("userId", id);
      setUserEmail(logEmail);
      setUserId(id);
      navigation("/");
    } catch (error) {
      setErrMessage(error.response.data.message);
      setTimeout(() => {
        setErrMessage("");
      }, 3000);
    }
  };
  return (
    <ecomContext.Provider
      value={{
        handleLogIn,
        setlogEmail,
        logEmail,
        setlogPassword,
        logPassword,
        cardAmount,
        setCardAmount,
        searchText,
        setSearchText,
        selectedText,
        setselectedText,
        params,
        setParams,
        userEmail,
        setUserEmail,
        userId,
        setUserId,
        cardData,
        isLoadingCard,
        errMessage,
        setErrMessage,
        from,
        setFrom,
        to,
        setTo,
        url,
      }}
    >
      {children}
    </ecomContext.Provider>
  );
};

export const UseEcomCon = () => useContext(ecomContext);

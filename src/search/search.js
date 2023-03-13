import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { UseEcomCon } from "../context";

function Search() {
  const { cardAmount, setCardAmount, searchText, setSearchText, url } =
    UseEcomCon();
  const data = useQuery("search", () => {
    return axios.get(`${url}/user/name/${searchText}`);
  });
  console.log(data.data);
  return <div>{searchText}</div>;
}

export default Search;

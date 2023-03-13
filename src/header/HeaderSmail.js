import React from "react";
import { UseEcomCon } from "../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
function HeaderSmail({}) {
  const {
    searchText,
    setSearchText,
    to,
    setTo,
    from,
    setFrom,
    setselectedText,
  } = UseEcomCon();
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/search");
  };
  const handleCategory = (e) => {
    const selected = e.target.value;
    if (selected === "all") {
      navigate("/all");
    } else {
      setselectedText(selected);
      navigate(`/category/?category=${selected}`);
    }
  };

  const handlePrice = (e) => {
    e.preventDefault();
    setFrom(from);
    setTo(to);
    if (from && to) {
      navigate(`/price/?from=${from}&to=${to}`);
    }
    if (!from && to) {
      navigate(`/price/?to=${to}`);
    }
    if (from && !to) {
      navigate(`/price/?from=${from}`);
    }
    window.location.reload();
  };
  return (
    <div>
      <form action="" className="input_d" onSubmit={handleSearch}>
        <button>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
          placeholder="Search by name..."
        />
      </form>

      <select className="header_select" onChange={(e) => handleCategory(e)}>
        <option value="all">All categories:</option>
        <option value="earphones">earphones</option>
        <option value="headphones">headphones</option>
        <option value="speaker">speaker</option>
        <option value="watch">watch</option>
      </select>
      <div className="price_cont">
        <form onSubmit={handlePrice}>
          <h3>Price:</h3>
          <label htmlFor="">From:</label>
          <input
            type="number"
            value={from || ""}
            onChange={(e) => setFrom(e.target.value)}
          />
          <label htmlFor="">To:</label>
          <input
            type="number"
            value={to || ""}
            onChange={(e) => setTo(e.target.value)}
          />
          <button>Search</button>
        </form>
      </div>
    </div>
  );
}

export default HeaderSmail;

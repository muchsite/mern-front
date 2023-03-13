import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faShoppingBag,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import logout from "../asets/logout.svg";
import logo from "../asets/elogo.png";
import { UseEcomCon } from "../context";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Header.scss";
import HeaderSmail from "./HeaderSmail";

function Header() {
  const {
    userEmail,
    setUserEmail,
    searchText,
    setSearchText,
    setselectedText,
    cardData,
    setUserId,
    to,
    setTo,
    from,
    setFrom,
    url,
  } = UseEcomCon();
  const [ham, setHam] = useState(true);
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
  const logOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    setUserEmail("");
    setUserId("");
    navigate("/");
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
    <>
      <div>
        <div className="home_head">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="" />
            </div>
          </Link>
          <div className="header_midle dn_for_medium">
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

            <select
              className="header_select"
              onChange={(e) => handleCategory(e)}
            >
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
          <div className="home_icon_cont">
            {
              <div
                className={`header_midle_medium dn_for_large ${
                  ham && "colsed_ham"
                }`}
              >
                <HeaderSmail handleSearch handleCategory handlePrice ham />
              </div>
            }

            {!userEmail && (
              <>
                <div
                  onClick={() => setHam(!ham)}
                  className={`dn_for_large hamburger_icon ${
                    !ham && "tranforme_ham"
                  }`}
                >
                  <div className="line _1"></div>
                  <div className="line _2"></div>
                  <div className="line _3"></div>
                </div>
                <Link to="/login">
                  <FontAwesomeIcon icon={faUser} className="home_icon" />
                </Link>
              </>
            )}
            {userEmail && (
              <div className="logedIn">
                <h1>Welcome: {userEmail}</h1>
                <div className="loged_icons">
                  <span className="card_icon">
                    My card:
                    <Link to="/card">
                      <FontAwesomeIcon
                        icon={faShoppingBag}
                        className="home_icon"
                      />
                    </Link>
                    <span className="card_amount">
                      {cardData && cardData?.items.length}
                    </span>
                  </span>

                  <div className="log_out">
                    <span>Log out:</span>
                    <img
                      src={logout}
                      alt=""
                      className="logOut"
                      onClick={logOut}
                    />
                  </div>
                  <div
                    onClick={() => setHam(!ham)}
                    className={`dn_for_large hamburger_icon ${
                      !ham && "tranforme_ham"
                    }`}
                  >
                    <div className="line _1"></div>
                    <div className="line _2"></div>
                    <div className="line _3"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default Header;

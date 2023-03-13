import React, { useEffect, useState } from "react";
import "./login.scss";
import { UseEcomCon } from "../context";
import { Link } from "react-router-dom";
function Login() {
  const {
    setlogEmail,
    logEmail,
    setlogPassword,
    logPassword,
    handleLogIn,
    errMessage,
    setErrMessage,
  } = UseEcomCon();

  return (
    <div className="login_cont">
      <form onSubmit={handleLogIn}>
        <div className="input_div">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name=""
            id="email"
            required={true}
            value={logEmail || ""}
            className={`${errMessage === "User not found" && "error_fild"}`}
            onChange={(e) => setlogEmail(e.target.value)}
          />
        </div>
        <div className="input_div">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            required={true}
            id="name"
            className={`${errMessage === "Incorrect password" && "error_fild"}`}
            value={logPassword || ""}
            onChange={(e) => setlogPassword(e.target.value)}
          />
        </div>
        <div className="flex">
          <button>Submit</button>
          {errMessage && <p className="error_message">{errMessage}</p>}
        </div>
      </form>
      <div>
        Don't Have an Account? <Link to="/signup"> Sign Up</Link>{" "}
      </div>
    </div>
  );
}

export default Login;

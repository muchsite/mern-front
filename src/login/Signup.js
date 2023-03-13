import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseEcomCon } from "../context";
import "./login.scss";
function Signup() {
  const navigation = useNavigate();
  const { setUserEmail, setUserId, url } = UseEcomCon();
  const [signEmail, setSignEmail] = useState();
  const [signPassword, setPassword] = useState();
  const [signPassword2, setPassword2] = useState();
  const [signErr, setSignErr] = useState();
  const handleSign = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/signup/user`, {
        email: signEmail,
        password: signPassword,
        password2: signPassword2,
      });
      const { token, email: emaill, id } = await res.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("email", emaill);
      localStorage.setItem("userId", id);
      setUserEmail(signEmail);
      setUserId(id);
      navigation("/");
    } catch (error) {
      setSignErr(error.response.data.message.split(" ")[0]);
      setTimeout(() => {
        setSignErr("");
      }, 4000);
    }
  };
  return (
    <div className="sign_cont">
      <form action="" onSubmit={handleSign}>
        <div className="input_div">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name=""
            id="email"
            required={true}
            value={signEmail || ""}
            className={`${signErr === "E11000" && "inp_border"}`}
            onChange={(e) => setSignEmail(e.target.value)}
          />
        </div>
        <div className="input_div">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            required={true}
            value={signPassword || ""}
            className={`${
              signErr === "Password"
                ? "inp_border"
                : signErr === "Passwords"
                ? "inp_border"
                : ""
            }`}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input_div">
          <label htmlFor="password2">Confirm password:</label>
          <input
            type="password"
            name="password2"
            required={true}
            value={signPassword2 || ""}
            onChange={(e) => setPassword2(e.target.value)}
            className={`${signErr === "Passwords" && "inp_border"}`}
          />
        </div>
        <div className="sign_BTN">
          <button>Submit</button>
          <p>
            {signErr === "E11000" && "User already exists"}
            {signErr === "Passwords" && "Passwords do not match"}
            {signErr === "Password" && "Password must be at least 5 characters"}
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup;

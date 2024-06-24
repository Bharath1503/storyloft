import React, { useState } from "react";
import "./LoginForm.css";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { emailvalidate, passwordvalidate } from "./regexvalidate";

const LoginForm = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [errormessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const Logincheck = (e) => {
    e.preventDefault();
    if (!emailvalidate(input.email)) {
      setErrorMessage("Please enter a valid username");
      return;
    }
    if (!passwordvalidate(input.password)) {
      setErrorMessage("Password should have a minimum of 6 characters");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: input.email,
      password: input.password,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://thestoryloft.in/api/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          setErrorMessage("");
          alert("Login Successful!");
        } else {
          setErrorMessage("Invalid username or password");
        }
      })
      .catch((error) => {
        console.log("error", error);
        setErrorMessage("An error occurred during login");
      });
  };

  return (
    <div className="container">
      <form>
        <h1>LOG IN</h1>
        {errormessage && (
          <div style={{ fontSize: "15px", marginLeft: "10px", color: "red" }}>
            {errormessage}
          </div>
        )}
        <div className="input-box">
          <input
            type="text"
            name="email"
            placeholder="UserName"
            required
            onChange={handleChange}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-box">
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            onChange={handleChange}
          />
          <RiLockPasswordFill className="icon" />
        </div>

        <div className="remember-me">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
        </div>
        <button type="submit" onClick={Logincheck}>
          Login
        </button>
        <div className="link">
          <p>
            website <a href="https://storyloft.onrender.com/">storyloft</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;

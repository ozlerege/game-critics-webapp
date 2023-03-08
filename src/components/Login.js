import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import login_pic from "./pictures/login_pic.png";
import "./styles/auth_style.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsername = (event) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    console.log(password);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (username === "" && password === "") {
      alert("Please enter username and password");
    } else if (username !== "" && password === "") {
      alert("Please enter your password");
    } else if (username === "" && password !== "") {
      alert("Please enter your username");
    } else {
      //Perform auth
      const user_data = {
        username: username,
        password: password,
      };
      fetch("/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user_data),
      })
        .then((response) => response.json()) // added .text() to log response body
        .then((data) => {
          console.log("Success:", data);
          if (data.user_exist === true) {
            navigate("/homepage");
          } else {
            navigate("/signup");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="form my-5 mx-5">
      <div className="d-flex justify-content-center align-items-center container">
        <div className="row p-4">
          <div className="col-lg-6 pt-2">
            <div className="h-row">
              <h2>Login</h2>
            </div>
            <Form onSubmit={submitHandler}>
              <Form.Label>Username</Form.Label>
              <div className="form-row my-2 pb-2">
                <Form.Control
                  id="username"
                  value={username}
                  onChange={handleUsername}
                  type="text"
                  required
                  minLength={3}
                  maxLength={20}
                ></Form.Control>
              </div>
              <Form.Label>Password</Form.Label>
              <div className="form-row my-2 pb-2">
                <Form.Control
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePassword}
                  required
                  minLength={3}
                  maxLength={20}
                ></Form.Control>
              </div>
              <div className="form-row mt-4 pb-4">
                <Button type="submit" variant="outline-dark">
                  Login
                </Button>
              </div>
              <div className="form-row mt-4">
                <h3>Don't Have an Account?</h3>
                <div className="form-row mt-4 pb-3">
                  <Link to="/signup">
                    <Button type="submit" variant="outline-dark">
                      Create an Account
                    </Button>
                  </Link>
                </div>
              </div>
            </Form>
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <img
              src={login_pic}
              alt="logo"
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

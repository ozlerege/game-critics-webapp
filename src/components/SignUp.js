import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import login_pic from "./pictures/login_pic.png";
import "./styles/auth_style.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [genre, setGenre] = useState("");
  const [platform, setPlatform] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };
  const handleGenre = (event) => {
    setGenre(event.target.value);
  };
  const handlePlatform = (event) => {
    setPlatform(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (username === "") {
      alert("wrong data");
    } else {
      const data = {
        username: { username },
        password: { password },
        genre: { genre },
        platform: { platform },
      };
      console.log(data);
    }
  };

  return (
    <div className="form my-5 mx-5">
      <div className="d-flex justify-content-center align-items-center container">
        <div className="row p-4">
          <div className="col-lg-6 pt-2">
            <div className="h-row">
              <h2>Sign Up</h2>
            </div>
            <Form>
              <Form.Label>Username</Form.Label>
              <div className="form-row my-2 pb-2">
                <Form.Control
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={handleUsername}
                  minLength={3}
                  maxLength={20}
                ></Form.Control>
              </div>
              <Form.Label>Password</Form.Label>
              <div className="form-row my-2 pb-2">
                <Form.Control
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={handlePassword}
                  minLength={3}
                  maxLength={20}
                ></Form.Control>
              </div>
              <Form.Label>Confirm Password</Form.Label>
              <div className="form-row my-2 pb-2">
                <Form.Control
                  id="confirm-password"
                  type="password"
                  required
                  value={confirm_password}
                  onChange={handleConfirmPassword}
                  minLength={3}
                  maxLength={20}
                ></Form.Control>
              </div>

              <div className="form-row mt-4">
                <h4>What kind of games do you play?</h4>
                <Form.Select
                  className="custom-select-form"
                  aria-label="Default select example"
                  value={genre}
                  onChange={handleGenre}
                  required
                >
                  <option value="Action">Action</option>
                  <option value="Action-Adventure">Action-Adventure</option>
                  <option value="RPG">RPG</option>
                  <option value="Simulation">Simulation</option>
                  <option value="Strategy">Strategy</option>
                  <option value="Sports">Sports</option>
                  <option value="MMO">MMO</option>
                  <option value="Adventure">Adventure</option>
                </Form.Select>
              </div>

              <div className="form-row mt-4 pb-3">
                <h4>What platform do you prefer?</h4>
                <Form.Select
                  className="custom-select-form"
                  aria-label="Default select example"
                  value={platform}
                  onChange={handlePlatform}
                  required
                >
                  <option selected>Select platform</option>
                  <option value="Xbox">Xbox</option>
                  <option value="Playstation">Playstation</option>
                  <option value="PC">PC</option>
                  <option value="Nintendo">Nintendo</option>
                </Form.Select>
              </div>
              <div className="form-row mt-4">
                <div className="form-row mt-4">
                  <Button
                    type="submit"
                    variant="outline-dark"
                    onClick={submitHandler}
                  >
                    Create Account
                  </Button>
                </div>
              </div>
              <div className="form-row mt-4">
                <h3>Already Have an Account?</h3>
                <div className="form-row mt-4 pb-3">
                  <Link to="/">
                    <Button type="submit" variant="outline-dark">
                      Login
                    </Button>
                  </Link>
                </div>
              </div>
            </Form>
          </div>
          <div className="col-lg-6 d-flex justify-content-center align-items-center">
            <img src={login_pic} className="img-fluid" alt="logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;

import Nav from "react-bootstrap/Nav";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import "./styles/nav_style.css";
import { Button, Container } from "react-bootstrap";
import { AuthContext } from "../context/Auth";
import { getAuth, signOut } from "firebase/auth";
import config from "./config.js";
function Layout() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const currentMonthName = months[today.getMonth()];

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged Out");
        navigate("/signup");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("query: ", searchQuery);
    navigate(`/search/${searchQuery}`);
  };

  const handleLogIn = () => {
    navigate("/");
  };
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <div>
      {location.pathname !== "/" && location.pathname !== "/signup" && (
        <Navbar
          bg="dark"
          variant="dark"
          expand="lg"
          className="navbar navbar-expand-lg bg-body-tertiary"
        >
          <Container fluid>
            <Navbar.Brand href="/homepage" className="navbar-brand">
              GameCritics
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="collapse">
              <Nav className="me-auto">
                <Nav.Link
                  className="nav-item"
                  href={`/upcoming/month/${currentMonthName}`}
                >
                  Upcoming
                </Nav.Link>
                <Nav.Link className="nav-item" href="/top100/page/1">
                  Top 100
                </Nav.Link>
                <Nav.Link className="nav-item" href="/recommend">
                  Recommend
                </Nav.Link>
                <Nav.Link className="nav-item" href="/profile">
                  Profile
                </Nav.Link>
              </Nav>
              <div className="search-wrapper">
                <Form className="d-flex" onSubmit={handleSubmit}>
                  <Form.Control
                    type="search"
                    placeholder="Search a Game"
                    className="me-2"
                    aria-label="Search"
                    value={searchQuery}
                    onChange={handleSearchQueryChange}
                    required
                  />

                  <Button
                    variant="success"
                    className="button"
                    type="submit"
                    style={{
                      backgroundColor: "green",
                      fontFamily: "Staatliches",
                    }}
                  >
                    Search
                  </Button>
                </Form>
              </div>
              <div>
                {currentUser !== null ? (
                  <Button
                    variant="danger"
                    className="button"
                    onClick={handleLogOut}
                  >
                    Log Out
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    className="button"
                    onClick={handleLogIn}
                  >
                    Log Ins
                  </Button>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )}
    </div>
  );
}
export default Layout;

import Nav from "react-bootstrap/Nav";
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "./pictures/logo.png";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./styles/nav_style.css";
function Layout() {
  const location = useLocation();
  return (
    <div>
      {location.pathname !== "/" && location.pathname !== "/signup" && (
        <Navbar
          className="navbar navbar-expand-lg bg-body-tertiary"
          bg="dark"
          variant="dark"
        >
          <div className="container-fluid">
            <a class="navbar-brand" href="/homepage">
              <img
                src={logo}
                alt="Logo"
                width="30"
                height="24"
                class="d-inline-block align-text-top"
              />
              GameCritics
            </a>
            <Button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </Button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Nav.Link href="/upcoming">Upcoming</Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link href="/top100/page/1">Top 100</Nav.Link>
                </li>
                <li className="nav-item">
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </li>
              </ul>
              <Form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search a Game"
                  aria-label="Search"
                  required
                  minLength="3"
                ></input>
              </Form>
            </div>
          </div>
        </Navbar>
      )}
    </div>
  );
}
export default Layout;

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
  return (
    <div>
      {location.pathname !== "/" && location.pathname !== "/signup" && (
        <Navbar
          className="navbar navbar-expand-lg bg-body-tertiary"
          bg="dark"
          variant="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/homepage">
              <img
                src={logo}
                alt="Logo"
                width="30"
                height="24"
                class="d-inline-block align-text-top"
              />
              GameCritics
            </a>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Nav.Link href={`/upcoming/month/${currentMonthName}`}>
                    Upcoming
                  </Nav.Link>
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
                  style={{ width: "200px" }}
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

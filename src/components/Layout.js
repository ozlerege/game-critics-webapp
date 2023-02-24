import Nav from "react-bootstrap/Nav";
import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import logo from "./pictures/logo.png";
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
          bg="dark"
          variant="dark"
          expand="lg"
          className="navbar navbar-expand-lg bg-body-tertiary"
        >
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
              <Nav.Link className="nav-item" href="/profile">
                Profile
              </Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Navbar.Collapse>
        </Navbar>
      )}
    </div>
  );
}
export default Layout;

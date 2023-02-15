import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import config from "./config.js";
import { FaRegHeart } from "react-icons/fa";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
function Upcoming() {
  const [upcomingGames, setUpcomingGames] = useState([]);

  const my_key = config.API_KEY;

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    const url = `https://api.rawg.io/api/games?key=${my_key}&dates=${today},2024-01-01&ordering=released`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setUpcomingGames(response.results);
      })
      .catch((err) => console.error(err));
  });

  return (
    <div className="main">
      <h1 className="pb-3 px-3">Upcoming games in 2023</h1>

      <div className="card-containers">
        {upcomingGames.map((games) => {
          return (
            <Card className="card" style={{ width: "18rem" }}>
              <Card.Img
                variant="top"
                src={games.background_image}
                style={{ height: "170px" }}
              />
              <Card.Body style={{ display: "flex", flexDirection: "column" }}>
                <Card.Title
                  style={{ fontFamily: "Staatliches", fontSize: "30px" }}
                >
                  {games.name}
                </Card.Title>
                <Card.Text>
                  <ListGroup
                    variant="flush"
                    style={{ fontFamily: "andale mono, monospace" }}
                  >
                    <ListGroup.Item>
                      <span
                        style={{ fontFamily: "Staatliches", fontSize: "20px" }}
                      >
                        Genre:
                      </span>{" "}
                      {games.genres.map((genre) => genre.name).join(", ")}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span
                        style={{ fontFamily: "Staatliches", fontSize: "20px" }}
                      >
                        Platforms:
                      </span>{" "}
                      {games.platforms
                        .map((platform) => platform.platform.name)
                        .join(", ")}{" "}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <span
                        style={{ fontFamily: "Staatliches", fontSize: "20px" }}
                      >
                        Release Date:
                      </span>{" "}
                      {games.released}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Text>
                <Button
                  variant="dark"
                  style={{
                    marginTop: "auto",
                    fontFamily: "andale mono, monospace",
                  }}
                >
                  Get Details
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
export default Upcoming;

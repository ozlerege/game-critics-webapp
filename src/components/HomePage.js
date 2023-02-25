import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import config from "./config.js";

function HomePage() {
  const [latestGames, setLatestGames] = useState([]);

  useEffect(() => {
    const my_key = config.API_KEY;
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    const url = `https:api.rawg.io/api/games?key=${my_key}&dates=${thirtyDaysAgo},${today}&metacritic=70,100&ordering=rating`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setLatestGames(response.results);
        console.log(response);
      })

      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="main">
      <h1 className="pb-3 px-3">Check out the new releases</h1>

      <div className="card-containers">
        {latestGames.map((games) => {
          return (
            <Card
              className="card"
              style={{ width: "18rem", backgroundcolor: "black" }}
            >
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
                    <ListGroup.Item>
                      <span
                        style={{ fontFamily: "Staatliches", fontSize: "20px" }}
                      >
                        Rating:
                      </span>{" "}
                      {games.rating}
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

export default HomePage;

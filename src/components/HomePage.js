import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import config from "./config.js";
function HomePage() {
  const [latestGames, setLatestGames] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  useEffect(() => {
    const my_key = config.API_KEY;
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const today = new Date().toISOString().slice(0, 10);
    const url = `https://api.rawg.io/api/games?key=${my_key}&dates=${thirtyDaysAgo},${today}&ordering=-added${selectedPlatform}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => setLatestGames(response.results))
      .catch((err) => console.error(err));
  }, [selectedPlatform]);

  const handlePlatformClick = (platform) => {
    console.log("Platform name", platform.target.value);
    setSelectedPlatform(`&parent_platforms=${platform.target.value}`);
  };
  console.log("Games List ", latestGames);
  return (
    <div className="main">
      <h1 className="pb-3">Check out the new releases</h1>
      <div className="form-row mt-4 px-2 pb-4">
        <Form.Select
          className="custom-select-form"
          aria-label="Default select example"
          onChange={handlePlatformClick}
          required
        >
          <option selected>Select platform</option>
          <option value="1">Xbox</option>
          <option value="Playstation 5">Playstation</option>
          <option value="3">PC</option>
          <option value="Nintendo">Nintendo</option>
        </Form.Select>
      </div>
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

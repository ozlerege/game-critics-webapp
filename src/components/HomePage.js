import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import config from "./config.js";
import { FaRegHeart } from "react-icons/fa";

function HomePage() {
  const [latestGames, setLatestGames] = useState([]);
  const [selectedPlatform, setSelectedPlatform] = useState("");

  const my_key = config.API_KEY;
  useEffect(() => {
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

  const handlePlatformClick = (event) => {
    fetch(`https://api.rawg.io/api/platforms?key=${my_key}`)
      .then((response) => response.json())
      .then((data) => {
        data.results.forEach((platform) => {
          if (platform.name === event.target.value) {
            console.log(platform.name + " :" + platform.id);
            setSelectedPlatform(platform.id);
          }
        });
      })
      .catch((error) => console.error(error));

    setSelectedPlatform(`&platforms=${event.target.value}`);
  };
  const handleIcon = (event) => {
    console.log("here");
  };
  return (
    <div className="main">
      <h1 className="pb-3 px-3">Check out the new releases</h1>
      <div className="form-row mt-4 px-3 pb-4">
        <Form.Select
          className="custom-select-form"
          aria-label="Default select example"
          onChange={handlePlatformClick}
          required
        >
          <option selected>Select platform</option>
          <option value="Xbox One">Xbox One</option>
          <option value="Xbox Series S/X">Xbox Series S/X</option>
          <option value="PlayStation 4">Playstation 4</option>
          <option value="PlayStation 5">Playstation 5</option>
          <option value="PC">PC</option>
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
              <Card.ImgOverlay style={{ padding: 0 }}>
                <Button
                  onClick={handleIcon}
                  variant="link"
                  style={{ position: "absolute", top: 0, right: 0 }}
                >
                  <FaRegHeart
                    className="favorite-icon"
                    icon={FaRegHeart}
                    color="white"
                    size="2em"
                  />
                </Button>
              </Card.ImgOverlay>
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

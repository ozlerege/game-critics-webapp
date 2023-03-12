import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState, useContext } from "react";

import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import config from "./config.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  console.log("user: ", currentUser);
  const [latestGames, setLatestGames] = useState([]);
  const last_year = new Date().getFullYear() - 1;
  const navigate = useNavigate();
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/games?key=${my_key}&dates=${thirtyDaysAgo},${today}&ordered=rating`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setLatestGames(response.results);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleBestGames = () => {
    navigate("/best-in-year/page/1");
  };
  return (
    <div className="main">
      <h1 className="pb-3 px-3">Welcome to GameCritics {currentUser}</h1>
      <ListGroup>
        <h3>Check out the latest releases</h3>
        <div className="card-containers">
          {latestGames.slice(0, 3).map((games, index) => {
            return (
              <Card className="card" style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={games.background_image}
                  style={{ height: "170px" }}
                />
                <Card.Body
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
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
                          style={{
                            fontFamily: "Staatliches",
                            fontSize: "20px",
                          }}
                        >
                          Genre:
                        </span>{" "}
                        {games.genres.map((genre) => genre.name).join(", ")}{" "}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span
                          style={{
                            fontFamily: "Staatliches",
                            fontSize: "20px",
                          }}
                        >
                          Platforms:
                        </span>{" "}
                        {games.platforms
                          ? games.platforms
                              .map((platform) => platform.platform.name)
                              .join(", ")
                          : "No data"}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <span
                          style={{
                            fontFamily: "Staatliches",
                            fontSize: "20px",
                          }}
                        >
                          Release Date:
                        </span>{" "}
                        {games.released}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Text>
                  <div
                    className="buttons"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Button
                      variant="dark"
                      className="button-edit"
                      style={{
                        marginTop: "auto",
                        marginLeft: "auto",
                        fontFamily: "andale mono, monospace",
                      }}
                    >
                      Get Details
                    </Button>

                    <Button
                      className="button-edit"
                      variant="warning"
                      style={{
                        marginTop: "auto",
                        marginLeft: "auto",
                        fontFamily: "andale mono, monospace",
                      }}
                    >
                      Add to Favorites
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
          {latestGames.length > 3 && (
            <Card className="card view-more" style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>View More</Card.Title>
              </Card.Body>
            </Card>
          )}
        </div>
      </ListGroup>
      <ListGroup>
        <br></br>
        <h3>Browse</h3>
        <div className="card-containers">
          <Card className="card" style={{ width: "18rem" }}>
            <Card.Img variant="top" style={{ height: "170px" }} />
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Title
                style={{ fontFamily: "Staatliches", fontSize: "30px" }}
              >
                Upcoming Games
              </Card.Title>
              <Card.Text></Card.Text>
              <div
                className="buttons"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="dark"
                  className="button-edit"
                  style={{
                    marginTop: "auto",
                    marginLeft: "auto",
                    fontFamily: "andale mono, monospace",
                  }}
                >
                  Get Details
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card className="card" style={{ width: "18rem" }}>
            <Card.Img variant="top" style={{ height: "170px" }} />
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Title
                style={{ fontFamily: "Staatliches", fontSize: "30px" }}
              >
                Best Games in {last_year}
              </Card.Title>
              <Card.Text></Card.Text>
              <div
                className="buttons"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="dark"
                  className="button-edit"
                  onClick={handleBestGames}
                  style={{
                    marginTop: "auto",
                    marginLeft: "auto",
                    fontFamily: "andale mono, monospace",
                  }}
                >
                  Get Details
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card className="card" style={{ width: "18rem" }}>
            <Card.Img variant="top" style={{ height: "170px" }} />
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Title
                style={{ fontFamily: "Staatliches", fontSize: "30px" }}
              >
                Recommendation
              </Card.Title>
              <Card.Text></Card.Text>
              <div
                className="buttons"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="dark"
                  className="button-edit"
                  style={{
                    marginTop: "auto",
                    marginLeft: "auto",
                    fontFamily: "andale mono, monospace",
                  }}
                >
                  Get Details
                </Button>
              </div>
            </Card.Body>
          </Card>
          <Card className="card" style={{ width: "18rem" }}>
            <Card.Img variant="top" style={{ height: "170px" }} />
            <Card.Body
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Card.Title
                style={{ fontFamily: "Staatliches", fontSize: "30px" }}
              >
                Top 100
              </Card.Title>
              <Card.Text></Card.Text>
              <div
                className="buttons"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button
                  variant="dark"
                  className="button-edit"
                  style={{
                    marginTop: "auto",
                    marginLeft: "auto",
                    fontFamily: "andale mono, monospace",
                  }}
                >
                  Get Details
                </Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </ListGroup>
    </div>
  );
}

export default HomePage;

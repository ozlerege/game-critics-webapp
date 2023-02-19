import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "./config.js";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/game_info.css";
function GameDesc() {
  const { gameID } = useParams();
  const [gameDetails, setGameDetails] = useState({});
  const [screenshots, setScreenshots] = useState([]);

  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/games/${gameID}?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("Game Info: ", response);
        setGameDetails(response);
      })
      .catch((err) => console.error(err));
  }, [gameID]);
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/games/${gameID}/screenshots?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("Screenshots: ", response);
        setScreenshots(response.results);
      })
      .catch((err) => console.error(err));
  }, [gameID]);

  console.log(gameDetails);

  return (
    <div className="main">
      <div className="container fluid">
        <div className="row">
          <div class="image-container">
            <img src={gameDetails.background_image} class="img-fluid" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ListGroup>
              <ListGroup.Item>
                <span
                  style={{
                    fontFamily: "Staatliches",
                    fontSize: "20px",
                  }}
                >
                  Name:
                </span>{" "}
                {gameDetails.name}
              </ListGroup.Item>
            </ListGroup>
          </div>

          <div className="col">
            <ListGroup>
              <ListGroup.Item>
                <span
                  style={{
                    fontFamily: "Staatliches",
                    fontSize: "20px",
                  }}
                >
                  Release Date:
                </span>{" "}
                {gameDetails.released}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ListGroup>
              {gameDetails.genres && (
                <ListGroup.Item>
                  <span
                    style={{
                      fontFamily: "Staatliches",
                      fontSize: "20px",
                    }}
                  >
                    Genre:
                  </span>{" "}
                  {gameDetails.genres.map((genre) => genre.name).join(", ")}{" "}
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>
          <div className="col">
            {gameDetails.developers && (
              <ListGroup>
                <ListGroup.Item>
                  <span
                    style={{
                      fontFamily: "Staatliches",
                      fontSize: "20px",
                    }}
                  >
                    Developers:
                  </span>{" "}
                  {gameDetails.developers
                    .map((developer) => developer.name)
                    .join(", ")}{" "}
                </ListGroup.Item>
              </ListGroup>
            )}
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ListGroup>
              {gameDetails.publishers && (
                <ListGroup.Item>
                  <span
                    style={{
                      fontFamily: "Staatliches",
                      fontSize: "20px",
                    }}
                  >
                    Publishers:
                  </span>{" "}
                  {gameDetails.publishers
                    .map((publisher) => publisher.name)
                    .join(", ")}{" "}
                </ListGroup.Item>
              )}
            </ListGroup>
          </div>
          <div className="col">
            <ListGroup>
              <ListGroup.Item>
                <span
                  style={{
                    fontFamily: "Staatliches",
                    fontSize: "20px",
                  }}
                >
                  MetaCritic Score:
                </span>{" "}
                {gameDetails.metacritic}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ListGroup>
              <ListGroup.Item>
                <span
                  style={{
                    fontFamily: "Staatliches",
                    fontSize: "20px",
                  }}
                >
                  Description:
                </span>{" "}
                {gameDetails.description_raw}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <ListGroup>
              <ListGroup.Item>
                <span
                  style={{
                    fontFamily: "Staatliches",
                    fontSize: "20px",
                  }}
                >
                  Screenshots:
                </span>{" "}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="screenshots-container">
              {screenshots.map((screenshot) => (
                <img
                  key={screenshot.id}
                  src={screenshot.image}
                  alt="screenshot"
                  className="screenshot-images"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameDesc;

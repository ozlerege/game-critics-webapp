import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "./config.js";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import "./styles/game_info.css";
import Card from "react-bootstrap/Card";
import ReactPaginate from "react-paginate";
function GameDesc() {
  const { gameID } = useParams();
  const navigate = useNavigate();
  const [gameDetails, setGameDetails] = useState({});
  const [screenshots, setScreenshots] = useState([]);
  const [series, setSeries] = useState([]);
  const [addition, setAdditions] = useState([]);
  const [review, setReview] = useState(null);
  const [parentGames, setParentGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [seriesCount, setSeriesCount] = useState(null);

  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https:api.rawg.io/api/games/${gameID}?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("Game Info: ", response);
        setGameDetails(response);
        if (Number(response.rating) >= 4.0) {
          setReview("Very Positive 😍");
        } else if (Number(response.rating) >= 3.0) {
          setReview("Positive 😆");
        } else if (Number(response.rating) >= 2.0) {
          setReview("Neutral 😐");
        } else if (Number(response.rating) >= 1.0) {
          setReview("Negative 🙁");
        } else if (Number(response.rating) >= 0.0) {
          setReview("Very Negative 😱");
        }
      })
      .catch((err) => console.error(err));
  }, [gameID]);
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https:api.rawg.io/api/games/${gameID}/screenshots?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("Screenshots: ", response);
        setScreenshots(response.results);
      })
      .catch((err) => console.error(err));
  }, [gameID]);

  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https:api.rawg.io/api/games/${gameID}/game-series?key=${my_key}&page=${currentPage}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("Series: ", response);
        setSeries(response.results);
        setSeriesCount(Math.ceil(response.count / 6));
      })
      .catch((err) => console.error(err));
  }, [gameID, currentPage]);
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https:api.rawg.io/api/games/${gameID}/parent-games?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("Parent Games: ", response);
        setParentGames(response.results);
      })
      .catch((err) => console.error(err));
  }, [gameID]);
  const handleClick = (gameId) => {
    navigate(`/gameinfo/${gameId}`);
    window.scroll(0, 0);
  };
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https:api.rawg.io/api/games/${gameID}/additions?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setAdditions(response.results);
      })
      .catch((err) => console.error(err));
  }, [gameID]);

  const changePage = ({ selected }) => {
    const nextPage = selected + 1;
    setCurrentPage(nextPage);
  };

  return (
    <div className="my-container">
      <h2>{gameDetails.name}</h2>
      <div className="image-container">
        <img
          src={gameDetails.background_image}
          className="img-fluid"
          alt="backgroundImage"
        />
      </div>
      <div className="list-group-container">
        <ListGroup>
          <ListGroup.Item className="list-group-item">
            <span
              style={{
                fontFamily: "Staatliches",
                fontSize: "30px",
              }}
            >
              Review:
            </span>{" "}
            {review}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item className="list-group-item">
            <span
              style={{
                fontFamily: "Staatliches",
                fontSize: "30px",
              }}
            >
              Website:
            </span>{" "}
            <a href={gameDetails.website}>{gameDetails.website}</a>
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item className="list-group-item">
            <span
              style={{
                fontFamily: "Staatliches",
                fontSize: "30px",
              }}
            >
              Release Date:
            </span>{" "}
            {gameDetails.released}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          {gameDetails.genres && (
            <ListGroup.Item className="list-group-item">
              <span
                style={{
                  fontFamily: "Staatliches",
                  fontSize: "30px",
                }}
              >
                Platforms:
              </span>{" "}
              {gameDetails.platforms
                .map((platform) => platform.platform.name)
                .join(", ")}{" "}
            </ListGroup.Item>
          )}
        </ListGroup>
        <ListGroup>
          {gameDetails.genres && (
            <ListGroup.Item className="list-group-item">
              <span
                style={{
                  fontFamily: "Staatliches",
                  fontSize: "30px",
                }}
              >
                Genre:
              </span>{" "}
              {gameDetails.genres.map((genre) => genre.name).join(", ")}{" "}
            </ListGroup.Item>
          )}
        </ListGroup>

        {gameDetails.developers && (
          <ListGroup>
            <ListGroup.Item className="list-group-item">
              <span
                style={{
                  fontFamily: "Staatliches",
                  fontSize: "30px",
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

        <ListGroup>
          {gameDetails.publishers && (
            <ListGroup.Item className="list-group-item">
              <span
                style={{
                  fontFamily: "Staatliches",
                  fontSize: "30px",
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

        <ListGroup>
          <ListGroup.Item className="list-group-item">
            <span
              style={{
                fontFamily: "Staatliches",
                fontSize: "30px",
              }}
            >
              MetaCritic Score:
            </span>{" "}
            {gameDetails.metacritic}
          </ListGroup.Item>
        </ListGroup>

        <ListGroup>
          <ListGroup.Item>
            <span
              style={{
                fontFamily: "Staatliches",
                fontSize: "30px",
              }}
            >
              Description:
            </span>{" "}
            {gameDetails.description_raw}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>
            <span
              style={{
                fontFamily: "Staatliches",
                fontSize: "30px",
              }}
            >
              Screenshots
            </span>{" "}
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
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>
            {addition.length === 0 ? (
              <div className="no-data-found"></div>
            ) : (
              <div className="list">
                <span
                  style={{
                    fontFamily: "Staatliches",
                    fontSize: "30px",
                  }}
                >
                  Other Editions
                </span>{" "}
                <div className="card-containers">
                  {addition.map((games) => {
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
                            style={{
                              fontFamily: "Staatliches",
                              fontSize: "30px",
                            }}
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
                                  MetaCritic Score:
                                </span>{" "}
                                {games.metacritic}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <span
                                  style={{
                                    fontFamily: "Staatliches",
                                    fontSize: "20px",
                                  }}
                                >
                                  Genre:
                                </span>{" "}
                                {games.genres
                                  .map((genre) => genre.name)
                                  .join(", ")}{" "}
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
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              variant="dark"
                              className="button-edit"
                              onClick={() => handleClick(games.id)}
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
                </div>
              </div>
            )}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>
            {series.length === 0 ? (
              <div className="no-data-found"></div>
            ) : (
              <div className="list">
                <span
                  style={{
                    fontFamily: "Staatliches",
                    fontSize: "30px",
                  }}
                >
                  Games That are part of the same series
                </span>{" "}
                <div className="pagination-container pb-3 px-3">
                  <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={seriesCount}
                    onPageChange={changePage}
                    containerClassName={"paginationButtons"}
                    previousLinkClassName={"previousButton"}
                    nextLinkClassName={"nextButton"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                  />
                </div>
                <div className="card-containers">
                  {series.map((games) => {
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
                            style={{
                              fontFamily: "Staatliches",
                              fontSize: "30px",
                            }}
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
                                  MetaCritic Score:
                                </span>{" "}
                                {games.metacritic}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <span
                                  style={{
                                    fontFamily: "Staatliches",
                                    fontSize: "20px",
                                  }}
                                >
                                  Genre:
                                </span>{" "}
                                {games.genres
                                  .map((genre) => genre.name)
                                  .join(", ")}{" "}
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
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              variant="dark"
                              className="button-edit"
                              onClick={() => handleClick(games.id)}
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
                </div>
              </div>
            )}
          </ListGroup.Item>
        </ListGroup>
        <ListGroup>
          <ListGroup.Item>
            {parentGames.length === 0 ? (
              <div className="no-data-found"></div>
            ) : (
              <div className="list">
                <span
                  style={{
                    fontFamily: "Staatliches",
                    fontSize: "30px",
                  }}
                >
                  Parent Games
                </span>{" "}
                <div className="card-containers">
                  {parentGames.map((games) => {
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
                            style={{
                              fontFamily: "Staatliches",
                              fontSize: "30px",
                            }}
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
                                  MetaCritic Score:
                                </span>{" "}
                                {games.metacritic}
                              </ListGroup.Item>
                              <ListGroup.Item>
                                <span
                                  style={{
                                    fontFamily: "Staatliches",
                                    fontSize: "20px",
                                  }}
                                >
                                  Genre:
                                </span>{" "}
                                {games.genres
                                  .map((genre) => genre.name)
                                  .join(", ")}{" "}
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
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Button
                              variant="dark"
                              className="button-edit"
                              onClick={() => handleClick(games.id)}
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
                </div>
              </div>
            )}
          </ListGroup.Item>
        </ListGroup>
      </div>
    </div>
  );
}

export default GameDesc;

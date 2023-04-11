import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import config from "./config.js";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/game_info.css";
import ReactPaginate from "react-paginate";
import CardComponent from "./CardComponent.js";
import { Button } from "react-bootstrap";
function GameDesc() {
  const { gameID } = useParams();
  const [gameDetails, setGameDetails] = useState({});
  const [screenshots, setScreenshots] = useState([]);
  const [series, setSeries] = useState([]);
  const [addition, setAdditions] = useState([]);
  const [review, setReview] = useState(null);
  const [parentGames, setParentGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [stores, setStores] = useState(null);
  const [seriesCount, setSeriesCount] = useState(null);
  const [storesObj, setStoresObj] = useState({});

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
    const url = `https:api.rawg.io/api/games/${gameID}/stores?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setStores(response.results);
        console.log("Stores: ", stores);
      })
      .catch((err) => console.error(err));
  }, [gameID, stores]);
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https:api.rawg.io/api/stores?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        // create an empty object to store the stores

        response.results.forEach((store) => {
          let updatedValue = {};
          updatedValue[store.id] = store.name;
          setStoresObj((storesObj) => ({
            ...storesObj,
            ...updatedValue,
          })); // add a key-value pair for each store ID and name
        });

        console.log("stores object: ", storesObj); // display the object in the console
      })
      .catch((err) => console.error(err));
  }, [gameID, storesObj]);

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
        setSeriesCount(Math.ceil(response.count / 10));
        console.log("Series Count: ", seriesCount);
      })
      .catch((err) => console.error(err));
  }, [gameID, currentPage, seriesCount]);
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
    <div
      className="my-container"
      style={{
        backgroundColor: `${gameDetails.dominant_color}`,
      }}
    >
      <h2>{gameDetails.name}</h2>

      <div className="list-group-container">
        <div className="form my-5 mx-5">
          <div className="d-flex justify-content-center align-items-center container">
            <div className="row p-4">
              <div className="col-lg-6 pt-2">
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

                  {gameDetails.developers && (
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
                  )}

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

                  <ListGroup.Item className="list-group-item">
                    <span
                      style={{
                        fontFamily: "Staatliches",
                        fontSize: "30px",
                      }}
                    >
                      MetaCritic Score:
                    </span>{" "}
                    {gameDetails.metacritic === null
                      ? "N/A"
                      : gameDetails.metacritic}
                  </ListGroup.Item>
                </ListGroup>
              </div>
              <div className="col-lg-6 d-flex justify-content-center align-items-center">
                <img
                  src={gameDetails.background_image}
                  className="img-fluid"
                  alt="backgroundImage"
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
              <div className="favorites px-4 py-3">
                <Button
                  variant="success"
                  style={{
                    fontFamily: "andale mono, monospace",
                  }}
                >
                  Add to Favorites
                </Button>{" "}
              </div>
            </div>
          </div>
        </div>

        <ListGroup>
          <ListGroup.Item>
            <span
              style={{
                fontFamily: "Staatliches",
                fontSize: "35px",
              }}
            >
              Description:
            </span>{" "}
            {gameDetails.description_raw}
          </ListGroup.Item>

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
          <ListGroup>
            <ListGroup.Item className="list-group-item">
              <span style={{ fontFamily: "Staatliches", fontSize: "30px" }}>
                Where to Buy:
              </span>{" "}
              <div className="stores">
                {stores &&
                  stores.map((store) => (
                    <>
                      <a
                        href={store.url}
                        style={{
                          color: "grey",
                        }}
                      >
                        {storesObj[store.store_id]}
                      </a>
                      <br />
                      <br />
                    </>
                  ))}
              </div>
            </ListGroup.Item>
          </ListGroup>
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
                <div
                  className="cards-containers"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                  }}
                >
                  {addition.map((games) => {
                    return (
                      <CardComponent
                        image={games.background_image}
                        title={games.name}
                        genre={games.genres}
                        platform={games.platforms}
                        date={games.released}
                        gameID={games.id}
                        key={games.id}
                      />
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
                <div
                  className="cards-containers"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                  }}
                >
                  {series.map((games) => {
                    return (
                      <CardComponent
                        image={games.background_image}
                        title={games.name}
                        genre={games.genres}
                        platform={games.platforms}
                        date={games.released}
                        gameID={games.id}
                        key={games.id}
                      />
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
                <div
                  className="cards-containers"
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "15px",
                  }}
                >
                  {parentGames.map((games) => {
                    return (
                      <CardComponent
                        image={games.background_image}
                        title={games.name}
                        genre={games.genres}
                        date={games.released}
                        platform={games.platforms}
                        gameID={games.id}
                        key={games.id}
                      />
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

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import "./styles/homepage.css";
import config from "./config.js";
import InputGroup from "react-bootstrap/InputGroup";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
function Recommend() {
  const [genreList, setGenreList] = useState([]);
  const [platformList, setPlatformList] = useState([]);
  const [publisherList, setPublisherList] = useState([]);
  const [selectedPublisher, setSelectedPublisher] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minMetacriticScore, setMinMetacriticScore] = useState(70);
  const [maxMetacriticScore, setMaxMetacriticScore] = useState(100);
  const [gameList, setGameList] = useState([]);
  const navigate = useNavigate();
  const handleClick = (gameId) => {
    console.log("Game Id: ", gameId);
    navigate(`/gameinfo/${gameId}`);
  };
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/genres?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setGenreList(response.results);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/platforms?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setPlatformList(response.results);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/publishers?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setPublisherList(response.results);
      })
      .catch((err) => console.error(err));
  }, []);
  const handlePublisherChange = (event) => {
    setSelectedPublisher(event.target.value);
  };
  const handleGenreChange = (event) => {
    setSelectedGenre(event.target.value);
  };

  const minOnChange = (event) => {
    setMinMetacriticScore(event.target.value);
  };
  const minOnFocus = (event) => {
    setMinMetacriticScore(event.target.value);
  };
  const minOnBlur = () => {
    if (minMetacriticScore < 0) {
      setMinMetacriticScore(0);
    } else if (minMetacriticScore > maxMetacriticScore) {
      setMinMetacriticScore(maxMetacriticScore);
    } else {
      setMinMetacriticScore(minMetacriticScore);
    }
  };
  const maxOnChange = (event) => {
    setMaxMetacriticScore(event.target.value);
  };
  const maxOnFocus = (event) => {
    setMaxMetacriticScore(event.target.value);
  };
  const maxOnBlur = () => {
    if (maxMetacriticScore > 100) {
      setMaxMetacriticScore(100);
    } else if (maxMetacriticScore < minMetacriticScore) {
      setMaxMetacriticScore(minMetacriticScore);
    } else {
      setMaxMetacriticScore(maxMetacriticScore);
    }
  };

  const handleSubmit = () => {
    const my_key = config.API_KEY;
    console.log("selected: ", selectedGenre);
    const url = `https://api.rawg.io/api/games?key=${my_key}&publishers=${selectedPublisher}&genres=${selectedGenre}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setGameList(response.results);
      })
      .catch((err) => console.error(err));
  };
  const renderGameCards = () => {
    return (
      <>
        {gameList.map((games) => {
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
      </>
    );
  };
  return (
    <div className="form my-5 mx-5">
      <div className="d-flex justify-content-center align-items-center container">
        <h1>Search a Game here</h1>
      </div>
      <ListGroup>
        <ListGroup.Item className="list-group-item">
          <span
            style={{
              fontFamily: "Staatliches",
              fontSize: "30px",
            }}
          >
            Genre
          </span>{" "}
          <Form.Select
            onChange={handleGenreChange}
            aria-label="Floating label select example"
          >
            <option>Select Genre</option>

            {genreList.map((genres, index) => {
              return (
                <option key={index} value={genres.slug}>
                  {genres.name}
                </option>
              );
            })}
          </Form.Select>
        </ListGroup.Item>
        <ListGroup.Item className="list-group-item">
          <span
            style={{
              fontFamily: "Staatliches",
              fontSize: "30px",
            }}
          >
            Platform
          </span>{" "}
          <Form.Select aria-label="Floating label select example">
            <option>Select Platform</option>

            {platformList.map((platforms, index) => {
              return (
                <option key={index} value={platforms.name}>
                  {platforms.name}
                </option>
              );
            })}
          </Form.Select>
        </ListGroup.Item>
        <ListGroup.Item className="list-group-item">
          <span
            style={{
              fontFamily: "Staatliches",
              fontSize: "30px",
            }}
          >
            Publishers
          </span>{" "}
          <Form.Select
            onChange={handlePublisherChange}
            aria-label="Floating label select example"
          >
            <option>Select Publisher</option>

            {publisherList.map((publishers, index) => {
              return (
                <option key={index} value={publishers.slug}>
                  {publishers.name}
                </option>
              );
            })}
          </Form.Select>
        </ListGroup.Item>

        <ListGroup.Item className="list-group-item">
          <span
            style={{
              fontFamily: "Staatliches",
              fontSize: "30px",
            }}
          >
            MetaCritic Score Range
          </span>{" "}
          <InputGroup className="mb-3">
            <InputGroup.Text>Min</InputGroup.Text>
            <Form.Control
              aria-label="Min Metacritic Score"
              type="number"
              min="0"
              max="100"
              value={minMetacriticScore}
              onChange={minOnChange}
              onFocus={minOnFocus}
              onBlur={minOnBlur}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>Max</InputGroup.Text>
            <Form.Control
              aria-label="Max Metacritic Score"
              min="0"
              max="100"
              type="number"
              value={maxMetacriticScore}
              onChange={maxOnChange}
              onFocus={maxOnFocus}
              onBlur={maxOnBlur}
            />
          </InputGroup>
        </ListGroup.Item>
        <ListGroup.Item>
          <Button onClick={handleSubmit} variant="success">
            Submit
          </Button>{" "}
        </ListGroup.Item>
        <ListGroup.Item>
          <div className="card-containers">{renderGameCards()}</div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default Recommend;

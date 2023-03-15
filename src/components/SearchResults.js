import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import config from "./config.js";
import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CardComponent from "./CardComponent.js";

import Form from "react-bootstrap/Form";

export default function SearchResults() {
  const { query } = useParams();
  const [queryResults, setQueryResults] = useState(query);
  const [gameResults, setGameResults] = useState([]);
  const handleQueryChange = (event) => {
    setQueryResults(event.target.value);
  };
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/games?key=${my_key}&search=${queryResults}`;
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setGameResults(response.results);
      })
      .catch((err) => console.error(err));
  }, [queryResults]);
  return (
    <div className="main">
      <h1 className="pb-3 px-3">Search Results</h1>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Search a Game Here</Form.Label>
          <Form.Control
            className="search-a-game"
            type="text"
            value={queryResults.toUpperCase()}
            onChange={handleQueryChange}
            placeholder={queryResults.toUpperCase()}
            style={{ fontFamily: "Staatliches", fontSize: "24px" }}
          />
        </Form.Group>
      </Form>
      {gameResults.length === 0 ? (
        <div className="no-data-found">No data found</div>
      ) : (
        <div className="card-containers">
          {gameResults.map((games) => {
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
      )}
    </div>
  );
}

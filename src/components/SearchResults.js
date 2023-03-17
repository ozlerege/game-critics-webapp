import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import config from "./config.js";
import "./styles/homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import CardComponent from "./CardComponent.js";
import userAvatar from "./pictures/userAvatar.png";
import Form from "react-bootstrap/Form";
import UserCardComponent from "./UserCardComponent.js";
import { AuthContext } from "../context/Auth";
import {
  collection,
  endAt,
  getDocs,
  startAt,
  query,
  getFirestore,
  orderBy,
  where,
} from "firebase/firestore";
export default function SearchResults() {
  const db = getFirestore();
  const { searchQuery } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [queryResults, setQueryResults] = useState(searchQuery);
  const [gameResults, setGameResults] = useState([]);
  const [userResults, setUserResults] = useState([]);
  const handleQueryChange = (event) => {
    setQueryResults(event.target.value);
  };
  useEffect(() => {
    const getUserData = async () => {
      const docRef = collection(db, "users");
      const docSnap = await getDocs(
        query(
          docRef,
          orderBy("email"),
          startAt(queryResults),
          endAt(queryResults + "\uf8ff")
        )
      );
      if (!docSnap.empty) {
        const results = [];
        docSnap.forEach((doc) => {
          results.push(doc.data());
        });
        console.log("query results:", results);
        setUserResults(results);
      } else {
        console.log("no results found");
      }
    };
    getUserData();
  }, [queryResults]);

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
          <Form.Label>Search a Game or User</Form.Label>
          <Form.Control
            className="search-a-game"
            type="text"
            value={queryResults}
            onChange={handleQueryChange}
            placeholder={queryResults}
            style={{ fontFamily: "Staatliches", fontSize: "24px" }}
          />
        </Form.Group>
      </Form>

      {gameResults.length === 0 ? (
        <div className="no-data-found"></div>
      ) : (
        <div>
          <h1>Game Results</h1>
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
        </div>
      )}
      <br></br>
      <br></br>
      {userResults.length === 0 ? (
        <div className="no-data-found"></div>
      ) : (
        <div>
          <h1>User Results</h1>
          <div className="card-containers">
            {userResults.map((user) => {
              return (
                <UserCardComponent
                  image={userAvatar}
                  email={user.email}
                  genre={user.genre}
                  platform={user.platform}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

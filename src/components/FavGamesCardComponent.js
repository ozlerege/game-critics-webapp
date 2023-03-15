import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import config from "./config.js";
import { getFirestore, arrayRemove } from "firebase/firestore";
import {
  doc,
  updateDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

export default function FavGamesCardComponent({ gameID }) {
  const [game, setGame] = useState(null);
  const [variant, setVariant] = useState("success");
  const [buttonText, setButtonText] = useState("Add to Favorites");
  const [isLoading, setLoading] = useState(false);
  const db = getFirestore();
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/games/${gameID}?key=${my_key}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log("resp: ", response);
        setGame(response);
      })
      .catch((err) => console.error(err));
  }, [gameID]);
  useEffect(() => {
    const checkFavorite = async () => {
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(usersRef, where("email", "==", currentUser))
      );
      const userDoc = querySnapshot.docs[0];

      if (userDoc) {
        const favorites = userDoc.data().favorites;
        if (favorites.includes(gameID)) {
          setVariant("danger");
          setButtonText("Remove from Favorites");
        } else {
          setVariant("success");
          setButtonText("Add to Favorites");
        }
      }
    };

    checkFavorite();
  }, [currentUser, gameID]);
  const handleClick = (gameID) => {
    console.log("Game Id: ", gameID);
    navigate(`/gameinfo/${gameID}`);
    window.scroll(0, 0);
  };

  const handleFavorites = async (gameId) => {
    setLoading(true);
    // Retrieve the user document from Firestore using the email address
    const usersRef = collection(db, "users");

    const querySnapshot = await getDocs(
      query(usersRef, where("email", "==", currentUser))
    );
    const userDoc = querySnapshot.docs[0];

    // Update the favorites array by adding the new gameId to it
    if (userDoc) {
      const favorites = userDoc.data().favorites;
      if (buttonText === "Add to Favorites") {
        favorites.push(gameId);
        await updateDoc(doc(usersRef, userDoc.id), {
          favorites: favorites,
        });
        alert("The game has added to favorites");
        setLoading(false);
        setVariant("danger");
        setButtonText("Remove from Favorites");
      } else {
        await updateDoc(doc(usersRef, userDoc.id), {
          favorites: arrayRemove(gameId),
        });
        alert("The game has been removed from favorites");
        setLoading(false);
        setVariant("success");
        setButtonText("Add to Favorites");
      }
    }

    // Update the user document in Firestore with the new favorites array
  };
  return (
    <Card className="card" style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={game?.background_image}
        style={{ height: "170px" }}
      />

      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card.Title style={{ fontFamily: "Staatliches", fontSize: "30px" }}>
          {game && game.name}
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
              {game
                ? game.genres.map((genre) => genre.name).join(", ")
                : "No data"}
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
              {game
                ? game.platforms
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
              {game && game.released}
            </ListGroup.Item>
          </ListGroup>
        </Card.Text>
        <div
          className="buttons"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Button
            variant="info"
            className="button-edit"
            onClick={() => handleClick(gameID)}
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
            disabled={isLoading}
            variant={variant}
            onClick={() => handleFavorites(gameID)}
            style={{
              marginTop: "auto",
              marginLeft: "auto",
              fontFamily: "andale mono, monospace",
            }}
          >
            {isLoading ? "Loading…" : buttonText}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

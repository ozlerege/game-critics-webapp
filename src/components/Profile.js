import React, { useContext, useEffect, useState } from "react";

import "./styles/profile.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { collection, getFirestore } from "firebase/firestore";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getDocs, query, where } from "firebase/firestore";
import { AuthContext } from "../context/Auth";
import FavGamesCardComponent from "./FavGamesCardComponent";
function Profile() {
  const [favGames, setFavGames] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [genre, setGenre] = useState(null);
  const [platform, setPlatform] = useState(null);
  const db = getFirestore();
  useEffect(() => {
    const getFavs = async () => {
      const docRef = collection(db, "users");
      const docSnap = await getDocs(
        query(docRef, where("email", "==", currentUser))
      );
      setFavGames(docSnap.docs[0].data()["favorites"]);
      setGenre(docSnap.docs[0].data().genre);
      setPlatform(docSnap.docs[0].data().platform);
    };
    getFavs();
  }, []);
  return (
    <Container
      style={{
        paddingTop: "40px",
      }}
    >
      <h2
        style={{
          paddingBottom: "40px",
        }}
      >
        Profile
      </h2>
      <Row
        style={{
          boxShadow:
            "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
        }}
      >
        <Col style={{ textAlign: "center" }}>
          <span
            style={{
              fontFamily: "Staatliches",
              fontSize: "30px",
            }}
          >
            Username:
          </span>{" "}
          <span
            style={{ fontFamily: "andale mono, monospace", fontSize: "25px" }}
          >
            {currentUser}
          </span>
          <hr />
        </Col>

        <Col style={{ textAlign: "center" }}>
          <span
            style={{
              fontFamily: "Staatliches",
              fontSize: "30px",
            }}
          >
            Date Joined:
          </span>{" "}
          <span
            style={{ fontFamily: "andale mono, monospace", fontSize: "25px" }}
          >
            {currentUser}
          </span>
          <hr />
        </Col>
      </Row>
      <br></br>
      <Row
        style={{
          boxShadow:
            "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
        }}
      >
        <Col style={{ textAlign: "center" }}>
          <span
            style={{
              fontFamily: "Staatliches",
              fontSize: "30px",
            }}
          >
            Favorite Game Genre:
          </span>{" "}
          <span
            style={{ fontFamily: "andale mono, monospace", fontSize: "25px" }}
          >
            {genre}
          </span>
          <hr />
        </Col>
        <Col style={{ textAlign: "center" }}>
          <span
            style={{
              fontFamily: "Staatliches",
              fontSize: "30px",
            }}
          >
            Favorite Game Platform:
          </span>{" "}
          <span
            style={{ fontFamily: "andale mono, monospace", fontSize: "25px" }}
          >
            {platform}
          </span>
          <hr />
        </Col>
      </Row>
      <br></br>
      <Row
        style={{
          boxShadow:
            "rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px",
        }}
      >
        <h3
          className="text-center"
          style={{
            fontFamily: "Staatliches",
            fontSize: "30px",
            paddingTop: "20px",
            paddingBottom: "20px",
          }}
        >
          Favorite Games
        </h3>
        <div className="card-containers">
          {favGames.map((game) => {
            return (
              <FavGamesCardComponent gameID={game}></FavGamesCardComponent>
            );
          })}
        </div>
      </Row>
    </Container>
  );
}

export default Profile;

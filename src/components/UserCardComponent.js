import React from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

export default function UserCardComponent({ image, email, genre, platform }) {
  return (
    <Card className="card" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={image} style={{ height: "170px" }} />
      <Card.Body
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Card.Title style={{ fontFamily: "Staatliches", fontSize: "30px" }}>
          {email && email.split("@")[0]}
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
                Favorite Genre:
              </span>{" "}
              {genre}
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
              {platform}
            </ListGroup.Item>
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

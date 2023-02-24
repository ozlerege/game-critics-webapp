import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import config from "./config.js";

function Upcoming() {
  var { getMonth } = useParams();
  const navigate = useNavigate();
  const handleClick = (gameId) => {
    console.log("Game Id: ", gameId);
    navigate(`/gameinfo/${gameId}`);
  };
  const [upcomingGames, setUpcomingGames] = useState([]);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const today = new Date();
  const currentMonthName = months[today.getMonth()];
  const [selectedMonth, setSelectedMonth] = useState(currentMonthName);

  useEffect(() => {
    const my_key = config.API_KEY;
    const monthToNumber = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12",
    };

    const month = monthToNumber[selectedMonth];
    const startDate = `${today.getFullYear()}-${month
      .toString()
      .padStart(2, "0")}-01`;
    const endDate = `${today.getFullYear()}-${month
      .toString()
      .padStart(2, "0")}-${new Date(today.getFullYear(), month, 0).getDate()}`;
    const url = `https://api.rawg.io/api/games?key=${my_key}&dates=${startDate},${endDate}&order=released`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setUpcomingGames(response.results);
        console.log("Total ", response.next);
      })
      .catch((err) => console.error(err));
  }, [selectedMonth]);
  const changeMonth = (month) => {
    setSelectedMonth(month);
    navigate(`/upcoming/month/${month}`);
  };
  return (
    <div className="main">
      <h1 className="pb-3 px-3">
        Upcoming popular games in {selectedMonth} {today.getFullYear()}
      </h1>
      <div className="months-container pb-3 px-3">
        {months.map((month, index) => (
          <Button
            style={{
              fontFamily: "andale mono, monospace",
            }}
            variant="dark"
            key={index}
            className={selectedMonth === month ? "active" : ""}
            onClick={() => changeMonth(month)}
          >
            {month}
          </Button>
        ))}
      </div>

      {upcomingGames.length === 0 ? (
        <div className="no-data-found">No data found</div>
      ) : (
        <div className="card-containers">
          {upcomingGames.map((games, index) => {
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
      )}
    </div>
  );
}
export default Upcoming;

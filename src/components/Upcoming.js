import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import config from "./config.js";
import CardComponent from "./CardComponent.js";
import { useNavigate } from "react-router-dom";
function Upcoming() {
  const navigate = useNavigate();
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
        console.log("Total ", response);
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
        <div
          className="cards-containers"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "15px",
          }}
        >
          {upcomingGames.map((games) => {
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
export default Upcoming;

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import config from "./config.js";
import ReactPaginate from "react-paginate";

function Top100() {
  const [topGames, setTopGames] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  var { pageNumber } = useParams();
  const gamePerPage = 20;
  const navigate = useNavigate();

  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/games?key=${my_key}&metacritic=90,100&order=metacritic&page=${currentPage}&page_size=${gamePerPage}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        console.log(response.results);
        setTopGames(response.results);
      })
      .catch((err) => console.error(err));
  }, [currentPage]);

  const changePage = ({ selected }) => {
    const nextPage = selected + 1;
    pageNumber = nextPage;
    setCurrentPage(nextPage);
    navigate(`/top100/page/${pageNumber}`);
    window.scroll(0, 0);
  };
  const handleClick = (gameId) => {
    console.log("Game Id: ", gameId);
    navigate(`/gameinfo/${gameId}`);
  };
  const handleFavoritesClick = (gameId) => {
    const data = { game_id: gameId };
    fetch("/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };
  return (
    <div className="main">
      <h1 className="pb-3 px-3">Top 100 Games of All Time</h1>

      {topGames.length === 0 ? (
        <div className="no-data-found">No data found</div>
      ) : (
        <div className="card-containers">
          {topGames.map((games) => {
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
                      onClick={() => handleFavoritesClick(games.id)}
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
      <div className="pagination-container pb-3 py-3">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={5}
          onPageChange={changePage}
          containerClassName={"paginationButtons"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </div>
  );
}

export default Top100;

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./styles/homepage.css";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import config from "./config.js";
import ReactPaginate from "react-paginate";
function BestGamesYearly() {
  const [gamesList, setGamesList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  var { pageNumber } = useParams();
  const navigate = useNavigate();
  const today = new Date();
  useEffect(() => {
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/games?key=${my_key}&dates=${
      today.getFullYear() - 1
    }-01-01,${today.getFullYear() - 1}-12-31&page=${currentPage}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setGamesList(
          response.results.sort((a, b) => b.metacritic - a.metacritic)
        );

        console.log(response);
      })

      .catch((err) => console.log(err));
  }, [currentPage]);

  const changePage = ({ selected }) => {
    const nextPage = selected + 1;
    pageNumber = nextPage;
    setCurrentPage(nextPage);
    navigate(`/best-in-year/page/${pageNumber}`);
    window.scroll(0, 0);
  };
  const handleClick = (gameId) => {
    console.log("Game Id: ", gameId);
    navigate(`/gameinfo/${gameId}`);
  };
  return (
    <div className="main">
      <h1 className="pb-3 px-3">Best games in {today.getFullYear() - 1}</h1>
      {gamesList.length === 0 ? (
        <div
          className="
        no-data-found"
        >
          No Data Found
        </div>
      ) : (
        <div className="card-containers">
          {gamesList.slice(0, 100).map((games) => {
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
        </div>
      )}
      <div className="pagination-container pb-3 py-3">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={10}
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
export default BestGamesYearly;

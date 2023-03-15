import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./styles/homepage.css";

import config from "./config.js";
import ReactPaginate from "react-paginate";
import CardComponent from "./CardComponent";
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

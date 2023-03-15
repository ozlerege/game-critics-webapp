import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CardComponent from "./CardComponent";
import "./styles/homepage.css";
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

  return (
    <div className="main">
      <h1 className="pb-3 px-3">Top 100 Games of All Time</h1>

      {topGames.length === 0 ? (
        <div className="no-data-found">No data found</div>
      ) : (
        <div className="card-containers">
          {topGames.map((games) => {
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

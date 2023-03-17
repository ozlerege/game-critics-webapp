import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import CardComponent from "./CardComponent";
import config from "./config.js";
import ReactPaginate from "react-paginate";
import "./styles/homepage.css";
import { useNavigate, useParams } from "react-router-dom";
export default function Latest() {
  const [latestGames, setLatestGames] = useState([]);
  var { pageNumber } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const gamePerPage = 20;
  const navigate = useNavigate();
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10);
    const my_key = config.API_KEY;
    const url = `https://api.rawg.io/api/games?key=${my_key}&dates=${thirtyDaysAgo},${today}&ordered=rating&page=${currentPage}&page_size=${gamePerPage}`;

    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        setLatestGames(response.results);
        console.log(response);
      })
      .catch((error) => console.log(error));
  }, [currentPage]);
  const changePage = ({ selected }) => {
    const nextPage = selected + 1;
    pageNumber = nextPage;
    setCurrentPage(nextPage);
    navigate(`/latest/page/${pageNumber}`);
    window.scroll(0, 0);
  };
  return (
    <div className="main">
      <h1 className="pb-3 px-3">Latest released games</h1>{" "}
      {latestGames.length === 0 ? (
        <div className="no-data-found">No data found</div>
      ) : (
        <div className="card-containers">
          {latestGames.map((games) => {
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

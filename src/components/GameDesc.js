import React from "react";
import { useLocation } from "react-router-dom";

function GameDesc() {
  const location = useLocation();

  const name = location.state.name;
  console.log("name: ", name);
  // Use the id prop here
  return (
    <div>
      <h1>Game Description</h1>
    </div>
  );
}

export default GameDesc;

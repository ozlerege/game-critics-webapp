import "./App.css";

import { Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import HomePage from "./components/HomePage";

import Top100 from "./components/Top100.js";
import Upcoming from "./components/Upcoming";
import GameDesc from "./components/GameDesc";
import Layout from "./components/Layout";

function App() {
  return (
    <div className="App">
      <Layout />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/homepage" element={<HomePage />} />
        <Route path="/upcoming" element={<Upcoming />} />
        <Route path="/top100/page/:pageNumber" element={<Top100 />} />
        <Route path="/gameinfo/:gameID" element={<GameDesc />} />
        <Route path="*" element={<h1>404 - Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;

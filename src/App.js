import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login.js";
import SignUp from "./components/SignUp.js";
import HomePage from "./components/HomePage";
import Recommend from "./components/Recommend";
import Top100 from "./components/Top100.js";
import Upcoming from "./components/Upcoming";
import GameDesc from "./components/GameDesc";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import BestGamesYearly from "./components/BestGamesYearly";
import { AuthProvider } from "./context/Auth";
import SearchResults from "./components/SearchResults.js";
function App() {
  return (
    <div className="App">
      <HashRouter basename="/game-critics-webapp">
        <AuthProvider>
          <Layout />

          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/signup" element={<SignUp />} />

            <Route exact path="/homepage" element={<HomePage />} />
            <Route exact path="/recommend" element={<Recommend />} />
            <Route
              exact
              path="/upcoming/month/:getMonth"
              element={<Upcoming />}
            />
            <Route exact path="/top100/page/:pageNumber" element={<Top100 />} />
            <Route exact path="/gameinfo/:gameID" element={<GameDesc />} />
            <Route
              exact
              path="/best-in-year/page/:pageNumber"
              element={<BestGamesYearly />}
            />
            <Route
              exact
              path="/search/:query"
              element={<SearchResults></SearchResults>}
            />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </div>
  );
}

export default App;

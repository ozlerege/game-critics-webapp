import { BrowserRouter, Route, Routes } from "react-router-dom";
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
      <BrowserRouter>
        <AuthProvider>
          <Layout />

          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/homepage" element={<HomePage />} />
            <Route path="/recommend" element={<Recommend />} />
            <Route path="/upcoming/month/:getMonth" element={<Upcoming />} />
            <Route path="/top100/page/:pageNumber" element={<Top100 />} />
            <Route path="/gameinfo/:gameID" element={<GameDesc />} />
            <Route
              path="/best-in-year/page/:pageNumber"
              element={<BestGamesYearly />}
            />
            <Route
              path="/search/:query"
              element={<SearchResults></SearchResults>}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<h1>404 - Not Found</h1>} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;

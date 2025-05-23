import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home"; // Using lowercase to match actual file name
import Login from "./pages/Login";
import Kontakt from "./pages/Kontakti";
import PagesaOnline from "./pages/PagesaOnline";
import RaportimProbleme from "./pages/raportimProbleme";
import RezervimTakimi from "./pages/rezervimTakimi";
import SherbimiDokumente from "./pages/sherbimiDokumente";
import Header from "./components/header";
import Footer from "./components/footer";
import Chatbox from "./components/Chatbox";

import "./App.css";
import "./index.css";
import "./styles.css";

export default function App() {
  // Simple login state
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      {/* Show header, footer and chat only when logged in */}
      {loggedIn && <Header onLogout={handleLogout} />}
      
      <main className="content-wrapper">
        <Routes>
          <Route
            path="/login"
            element={
              loggedIn ? <Navigate to="/" /> : <Login onLogin={() => setLoggedIn(true)} />
            }
          />
          <Route
            path="/"
            element={loggedIn ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/kontakt"
            element={loggedIn ? <Kontakt /> : <Navigate to="/login" />}
          />
          <Route
            path="/pagesa-online"
            element={loggedIn ? <PagesaOnline /> : <Navigate to="/login" />}
          />
          <Route
            path="/raportim-probleme"
            element={loggedIn ? <RaportimProbleme /> : <Navigate to="/login" />}
          />
          <Route
            path="/rezervim-takimi"
            element={loggedIn ? <RezervimTakimi /> : <Navigate to="/login" />}
          />
          <Route
            path="/sherbimi-dokumente"
            element={loggedIn ? <SherbimiDokumente /> : <Navigate to="/login" />}
          />
          {/* Redirect to home or login if route doesn't exist */}
          <Route path="*" element={<Navigate to={loggedIn ? "/" : "/login"} />} />
        </Routes>
      </main>
      
      {loggedIn && <Footer />}
      {loggedIn && <Chatbox />}
    </Router>
  );
}

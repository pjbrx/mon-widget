import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { assistants } from "./data";
import AssistantWidget from "./components/AssistantWidget";
import AboutPage from "./pages/AboutPage";
import HomePage from "./pages/HomePage";
import JeuScout from "./pages/JeuScout"
import "./App.css";

function App() {
  return (
    <Router>
      <div className="container">
        <header>
          <Link to="/">
            <img src="/logo_cléa.png" alt="Logo Cléa" className="logo-clea" />
          </Link>
          <h1>Assistants Vocaux Cléa</h1>
          <nav>
            <Link to="/about" className="nav-link">
              À propos
            </Link>
            <Link to="/jeu" className="nav-link">Jeu Scout</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <div className="assistant-list">
                  {assistants.map((assistant, index) => (
                    <div className="assistant-item" key={assistant.id}>
                      <h2>{assistant.name}</h2>
                      <AssistantWidget
                        agentId={assistant.id}
                        index={index}
                        name={assistant.name}
                      />
                    </div>
                  ))}
                </div>
              }
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/jeu" element={<JeuScout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
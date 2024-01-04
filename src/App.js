import "./styles.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from "./TodoList";
import Footer from "./Footer";
import { Routes, Route } from "react-router-dom";

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
            />
          }
        />
      </Routes>
    </div>
  );
}

const Home = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="App">
      <div className="app-container">
        <TodoList currentLanguage={currentLanguage} />
      </div>
      <Footer currentLanguage={currentLanguage} onLanguageChange={onLanguageChange} />
    </div>
  );
};

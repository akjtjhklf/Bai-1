import React from "react";

const Footer = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="mt-5">
      <h3>{currentLanguage === "en" ? "Made by MindX 🔥" : "Được tạo bởi MindX 🔥"}</h3>
      <div >
        <span>{currentLanguage === "en" ? "Available on:" : "Có sẵn trên:"}</span>
        <button className={`btn btn-light m-3 language-picker ${currentLanguage === "vn" ? "selected" : ""}`} onClick={() => onLanguageChange("vn")}>
          🇻🇳
        </button>
        <button className={`btn btn-light language-picker ${currentLanguage === "en" ? "selected" : "" }`} onClick={() => onLanguageChange("en")}>
          🇺🇸
        </button>
      </div>
    </div>
  );
};

export default Footer;
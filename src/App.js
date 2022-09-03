// @ts-nocheck
import React, { useCallback, useRef, useState } from "react";
import "./App.css";
import Dropdown from "./components/Dropdown.jsx";

import { languages, countries } from "./data/data";

function App() {
  const [query, setQuery] = useState({ country: "", language: "" });

  // Selected Item
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");

  // If select button is Click
  const [countryClick, setCountryClick] = useState(false);
  const [languageClick, setLanguageClick] = useState(false);

  // position of the element
  const [countryCursor, setCountryCursor] = useState(0);
  const [languageCursor, setLanguageCursor] = useState(0);

  // Parent of list items
  const ParentCountryScrollRef = useRef();
  const ParentLanguageScrollRef = useRef();

  // list items
  const countryScrollRef = useRef();
  const languageScrollRef = useRef();

  // Search function
  const handleQuery = (e) => {
    setQuery((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value
    }));
  };

  /**
   *  On Key press a
   * 13 = ENTER
   * 40 = Arrow Down
   * 38 = Arrow Up
   *  */

  const handleKeydown = useCallback(
    (e, name, index) => {
      const active = document.activeElement;

      // if Enter key is Pressed
      if (e.keyCode === 13) {
        if (name === "country") {
          setSelectedCountry(e.target.textContent);
          setCountryClick(false);
          setCountryCursor(index);
          active.focus();
        } else if (name === "language") {
          setSelectedLanguage(e.target.textContent);
          setLanguageClick(false);
          setLanguageCursor(index);
          active.focus();
        }
      }
      // if Enter Arrow Down is Pressed
      if (e.keyCode === 40) {
        active.nextElementSibling.focus();
        if (name === "country") {
          setCountryCursor((prevVal) => prevVal + 1);
        } else if (name === "language") {
          setLanguageCursor((prevVal) => prevVal + 1);
        }
        // if Enter Arrow Up is Pressed
      } else if (e.keyCode === 38) {
        if (countryCursor > 0 || languageCursor > 0) {
          active.previousElementSibling.focus();
        }
        if (name === "country") {
          return countryCursor === 0
            ? countryCursor
            : setCountryCursor((prevCursor) => prevCursor - 1);
        } else if (name === "language") {
          return languageCursor === 0
            ? languageCursor
            : setLanguageCursor((prevCursor) => prevCursor - 1);
        }
      }
    },
    [countryCursor, languageCursor]
  );

  // handle Item Click
  const handleItemClick = (e, name, index) => {
    if (name === "language") {
      setLanguageClick((prev) => !prev);
      setSelectedLanguage(e.target.textContent);
      setLanguageCursor(index);
    } else if (name === "country") {
      setCountryClick((prev) => !prev);
      setCountryCursor(index);
      setSelectedCountry(e.target.textContent);
    }
  };

  // handle Dropdown/select Click
  const handleDropdownClick = (name) => {
    if (name === "language") {
      setTimeout(() => {
        ParentLanguageScrollRef.current.children[languageCursor].focus();
      }, 100);
      setLanguageClick((prev) => !prev);
    } else if (name === "country") {
      setTimeout(() => {
        ParentCountryScrollRef.current.children[countryCursor].focus();
      }, 100);
      setCountryClick((prev) => !prev);
    }
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="selected-container">
          <h3>Display My Selected Value</h3>
          <p>Country: {selectedCountry}</p>
          <p>Language: {selectedLanguage}</p>
        </div>
        <div className="dropdown-container">
          <Dropdown
            data={languages}
            name="language"
            isDropdownClick={languageClick}
            selected={selectedLanguage}
            handleQuery={handleQuery}
            query={query.language}
            cursor={languageCursor}
            handleKeyDown={handleKeydown}
            scrollRef={languageScrollRef}
            handleItemClick={handleItemClick}
            handleDropdown={handleDropdownClick}
            parentScrollRef={ParentLanguageScrollRef}
          />
          <Dropdown
            data={countries}
            name="country"
            isDropdownClick={countryClick}
            selected={selectedCountry}
            handleQuery={handleQuery}
            query={query.country}
            cursor={countryCursor}
            handleKeyDown={handleKeydown}
            scrollRef={countryScrollRef}
            handleItemClick={handleItemClick}
            handleDropdown={handleDropdownClick}
            parentScrollRef={ParentCountryScrollRef}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

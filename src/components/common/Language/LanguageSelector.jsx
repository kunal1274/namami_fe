import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import usFlag from "../../../assets/photo/usFlag.jpg";
import india_img from "../../../assets/photo/india_img.jpg";

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState({
    language: "English (US)",
    flag: india_img,
  });

  const handleSelect = (eventKey) => {
    const languageData = {
      "English (US)": usFlag,
      "English (Indian)": india_img,
    };

    setSelectedLanguage({
      language: eventKey,
      flag: languageData[eventKey],
    });
  };

  return (
    <DropdownButton
      variant="light"
      id="dropdown-basic"
      title={
        <div className="d-flex align-items-center">
          <img
            src={selectedLanguage.flag}
            alt={`${selectedLanguage.language} Flag`}
            width="20"
            height="20"
            className="me-2"
          />
          {selectedLanguage.language}
        </div>
      }
      onSelect={handleSelect}
    >
      <Dropdown.Item eventKey="English (US)">
        <div className="d-flex align-items-center">
          <img
            src={usFlag}
            alt="US Flag"
            width="20"
            height="20"
            className="me-2"
          />
          English (US)
        </div>
      </Dropdown.Item>
      <Dropdown.Item eventKey="English (Indian)">
        <div className="d-flex align-items-center">
          <img
            src={india_img}
            alt="India Flag"
            width="20"
            height="20"
            className="me-2"
          />
          English (Indian)
        </div>
      </Dropdown.Item>
    </DropdownButton>
  );
};

export default LanguageSelector;

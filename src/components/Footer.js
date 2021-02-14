import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const footer = () => {
  const iconsStyle = {
    color: "white",
    marginLeft: "30px",
  };
  const footerStyle = {
    backgroundColor: "#273443",
    flexShrink: "none",
    marginTop: "20px",
  };
  return (
    <div style={footerStyle}>
      <div className="text-center py-3">
        <div>
          <FontAwesomeIcon icon={["fab", "facebook"]} style={iconsStyle} />
          <FontAwesomeIcon icon={["fab", "twitter"]} style={iconsStyle} />
          <FontAwesomeIcon icon={["fab", "instagram"]} style={iconsStyle} />
        </div>
        <div className="text-light">
          <Link to="/" className="text-light" style={{ fontSize: "12px" }}>
            <img
              style={{ width: "200px", height: "45px" }}
              alt="Clock"
              src={require("../assets/svgs/sport-car.svg")}
            />
          </Link>
        </div>
        <Link
          to="/privacyPolicy"
          className="text-light"
          style={{ fontSize: "12px" }}
        >
          Privacy Policy
        </Link>
        <Link
          to="/termsAndConditions"
          className="text-light"
          style={{ fontSize: "12px", marginLeft: "10px" }}
        >
          Terms and Conditions
        </Link>
        <div className="text-light">
          © 2020 Moti Kenya. All Rights Reserved.
        </div>
      </div>
    </div>
  );
};

export default footer;

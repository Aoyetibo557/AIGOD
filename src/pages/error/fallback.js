import React from "react";
import "./fallback.css";
import LogoImage from "../../images/aigod_ftp.png";
import { Button } from "../../components/button/button";

const Fallback = () => {
  return (
    <div className="fallback_container">
      <div className="fallback_content">
        <div>
          <img className="logo_img" src={LogoImage} alt="Aigod Logo" />
        </div>
        <div>
          <h3 className="fallback_text">
            I know something seems wrong but fret not as God works in mysterious
            ways.{" "}
          </h3>
          <p className="fallback_subtext">
            If the problem persist, contact us at{" "}
            <a href="mailto: allmighty@aigod.ai">allmighty@aigod.ai</a>
          </p>
        </div>

        <div className="fallback_btns">
          <Button linkTo="/" type="primary" size="lg">
            Go Home
          </Button>

          <Button type="secondary" size="lg">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Fallback;

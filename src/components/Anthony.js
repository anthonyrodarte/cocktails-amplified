import React from "react";

import bio from "./bio";
import Selfie from "../images/WebsiteCard.jpeg";
import Github from "../images/GitHub-logo.png";
import LinkedIn from "../images/linkedin-logo-copy.png";

const About = () => {
  return (
    <div>
      <div className="bio-row">
        <div className="bio-row-item">
          <img src={Selfie} className="selfie" alt="Anthony Rodarte" />
        </div>
        <div className="bio-row-item">
          <div className="bio-text">
            <span>{bio}</span>
          </div>
        </div>
      </div>

      <div>
        <div>
          <h2 className="slanted-box">LINKS</h2>
        </div>

        <div className="social-links">
          <a
            href="https://github.com/anthonyrodarte"
            target="_blank"
            rel="noreferrer"
          >
            <img src={Github} className="github-logo" alt="Github" />
          </a>
          <a
            href="https://www.linkedin.com/in/anthony-rodarte-99abb1155/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={LinkedIn} className="linkedIn-logo" alt="LinkedIn" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;

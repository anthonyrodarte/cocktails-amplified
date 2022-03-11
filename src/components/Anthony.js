import React from "react";

import Selfie from "../images/anthony.jpeg";
import Github from "../images/GitHub-logo.png";
import LinkedIn from "../images/linkedin-logo-copy.png";

const About = () => {
  return (
    <div>
      <img src={Selfie} className="selfie" alt="Anthony Rodarte" />
      <div>
        <h1 className="slanted-box">ANTHONY RODARTE</h1>
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

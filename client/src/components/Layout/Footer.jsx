import React from "react";
import ErrorBoundary from "../../utils/ErrorBoundary";
import "../../styles/Footer.css";

const Footer = () => {
  return (
    <div
      className="footer bg-slate-800"
      // style={{ backgroundColor: "#414257" }}
    >
      {/* <h3 className="text-white text-lg font-serif"><span className="text-green-500">{`<`}</span> <span className="text-gray-500">{`E/PENSE`}</span> <span className="text-green-500">{`/>`}</span> </h3> */}

      <div className="links">
        <ErrorBoundary>
          <a
            className="discord lord"
            href="https://discord.com/users/demogorgon_69"
            target="_blank"
            title="Discord"
            rel="noopener noreferrer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/olkyggkm.json"
              trigger="loop"
              delay="900"
              stroke="light"
              state="in-reveal"
              colors="primary:#109121,secondary:#9cf4a7"
              style={{ width: "5rem", height: "3.5rem" }}
            ></lord-icon>
          </a>
          <a
            className="github lord"
            href="http://github.com/chaitanya8108"
            target="_blank"
            title="GitHub"
            rel="noopener noreferrer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/zkiskfnp.json"
              trigger="loop"
              delay="900"
              stroke="light"
              state="in-reveal"
              colors="primary:#9cf4a7,secondary:#109121"
              style={{ width: "5rem", height: "3.5rem" }}
            ></lord-icon>
          </a>
          <a
            className="linkedin lord"
            href="https://www.linkedin.com/in/chaitanya-sharma-9732b7259"
            target="_blank"
            title="LinkedIn"
            rel="noopener noreferrer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/ofrzywfo.json"
              trigger="loop"
              delay="900"
              stroke="light"
              state="in-reveal"
              colors="primary:#109121,secondary:#9cf4a7"
              style={{ width: "5rem", height: "3.5rem" }}
            ></lord-icon>
          </a>
        </ErrorBoundary>
      </div>
      <p className="copyright text-center text-white font-serif">
        All rights reserved &copy; chaitanya8108
      </p>
    </div>
  );
};

export default Footer;

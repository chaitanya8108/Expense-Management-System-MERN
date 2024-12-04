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
              src="https://cdn.lordicon.com/jvewmlrd.json"
              trigger="hover"
              colors="primary:#414257,secondary:#66eece"
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
              src="https://cdn.lordicon.com/ubpgwkmy.json"
              trigger="hover"
              colors="primary:#414257,secondary:#66eece"
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
              src="https://cdn.lordicon.com/dsdlqjde.json"
              trigger="hover"
              state="hover-draw"
              colors="primary:#414257,secondary:#66eece"
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

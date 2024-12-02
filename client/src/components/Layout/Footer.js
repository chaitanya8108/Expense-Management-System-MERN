import React from "react";
import ErrorBoundary from "../../utils/ErrorBoundary";

const Footer = () => {
  return (
    <div
      className="p-9 flex flex-col bg-slate-800 justify-evenly items-center gap-3"
      // style={{ backgroundColor: "#414257" }}
    >
      {/* <h3 className="text-white text-lg font-serif"><span className="text-green-500">{`<`}</span> <span className="text-gray-500">{`E/PENSE`}</span> <span className="text-green-500">{`/>`}</span> </h3> */}

      <div className="flex flex-row items-center justify-between">
        <ErrorBoundary>
          <a
            className="discord"
            href="https://discord.com/users/demogorgon_69"
            target="_blank"
            title="Discord"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jvewmlrd.json"
              trigger="hover"
              colors="primary:#414257,secondary:#66eece"
              style={{ width: "10rem", height: "4rem" }}
            ></lord-icon>
          </a>
          <a
            className="github"
            href="http://github.com/chaitanya8108"
            target="_blank"
            title="GitHub"
          >
            <lord-icon
              src="https://cdn.lordicon.com/ubpgwkmy.json"
              trigger="hover"
              colors="primary:#414257,secondary:#66eece"
              style={{ width: "10rem", height: "3.5rem" }}
            ></lord-icon>
          </a>
          <a
            className="linkedin"
            href="https://www.linkedin.com/in/chaitanya-sharma-9732b7259"
            target="_blank"
            title="LinkedIn"
          >
            <lord-icon
              src="https://cdn.lordicon.com/dsdlqjde.json"
              trigger="hover"
              state="hover-draw"
              colors="primary:#414257,secondary:#66eece"
              style={{ width: "10rem", height: "3.5rem" }}
            ></lord-icon>
          </a>
        </ErrorBoundary>
      </div>
      <h6 className="text-center text-white font-serif">
        All rights reserved &copy; chaitanya8108
      </h6>
    </div>
  );
};

export default Footer;

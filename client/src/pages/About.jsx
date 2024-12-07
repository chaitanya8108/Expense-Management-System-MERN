import React from "react";
import "../styles/About.css";
import profilePic from "../assets/profilePic.jpg";
import ErrorBoundary from "../utils/ErrorBoundary";

const About = () => {
  return (
    <div className="about">
      {/* <section className="about-section"> */}
      <div className="section-title">
        <div className="icon-title">
          <ErrorBoundary>
            <lord-icon
              src="https://cdn.lordicon.com/szoiozyr.json"
              trigger="loop"
              delay="1000"
              stroke="light"
              state="in-reveal"
              colors="primary:#000000,secondary:#242424,tertiary:#d59f80,quaternary:#794628,quinary:#000000"
              style={{ width: "3rem", height: "3rem" }}
            ></lord-icon>
          </ErrorBoundary>
          <p className="title1 font-serif">ABOUT</p>
        </div>
        <p className="summary font-serif">
          Passionate and driven beginner seeking opportunities to learn, grow
          and contribute. Possessing strong foundational skills in Java,
          JavaScript, MySQL, React Native, HTML, CSS, Bootstrap. Approach
          challenges with a proactive attitude and a willingness to take on new
          tasks. With knowledge, adaptability and collaborative nature, eager to
          apply to a dynamic team and make a positive impact. Open to connecting
          with professionals in the Software and Computer industries. Let’s
          connect and discover effective collaboration.
        </p>
      </div>

      <div className="main">
        <div className="main-inner">
          <div className="img">
            <img src={profilePic} alt="Profile Pic" />
          </div>
          <div className="content h-full">
            <div className="title-summary">
              <div className="job-title-lord">
                <p className="job-title font-serif">MERN DEVELOPER</p>
                <ErrorBoundary>
                  <lord-icon
                    src="https://cdn.lordicon.com/yhwigecd.json"
                    trigger="loop"
                    delay="500"
                    stroke="light"
                    colors="primary:#000000,secondary:#30c9e8"
                    style={{ width: "3rem", height: "3rem" }}
                  ></lord-icon>
                </ErrorBoundary>
              </div>
              <p className="job-title-summary">
                Crafting full-stack solutions !{" "}
              </p>
            </div>

            <div className="details shadow-md rounded">
              <div className="details-left">
                <ol>
                  <li>
                    <strong>Birthday : </strong>
                    <span>14 Jan 2002</span>
                  </li>
                  <li className="link flex flex-row justify-between items-center w-[60%]">
                    <strong>Websie : </strong>
                    <span>
                      <a
                        href="https://linktr.ee/chaitanya8108"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ErrorBoundary>
                          <lord-icon
                            src="https://cdn.lordicon.com/cbigqefp.json"
                            trigger="loop"
                            delay="1500"
                            stroke="light"
                            state="in-reveal"
                            colors="primary:#000000,secondary:#16a9c7"
                            style={{ width: "1.5rem", height: "1.5rem" }}
                          ></lord-icon>
                        </ErrorBoundary>
                      </a>
                    </span>
                  </li>
                  <li>
                    <strong>Phone : </strong>
                    <span>+91 6006516861</span>
                  </li>
                  <li>
                    <strong>City : </strong>
                    <span>Bangalore</span>
                  </li>
                </ol>
              </div>
              <div className="details-right">
                <ol>
                  <li>
                    <strong>Age : </strong>
                    <span>22</span>
                  </li>
                  <li>
                    <strong>Degree : </strong>
                    <span>B.Tech</span>
                  </li>
                  <li>
                    <strong>Email : </strong>
                    <span>chaitanya81082430@gmail.com</span>
                  </li>
                  <li>
                    <strong>Freelance : </strong>
                    <span>Available</span>
                  </li>
                </ol>
              </div>
            </div>
            <p className="footer-summary"></p>
          </div>
        </div>
      </div>
      {/* </section> */}
    </div>
  );
};

export default About;

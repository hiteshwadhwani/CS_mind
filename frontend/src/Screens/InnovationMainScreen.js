import React, { useEffect } from "react";
import "../components/innov.css";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getContentDetails } from "../actions/contentActions";
import Message from "../components/Message";
import Loader from '../components/Loader';

const InnovationMainScreen = () => {
  const contentDetails = useSelector((state) => state.contentDetails);
  const { loading, error, contentItems } = contentDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getContentDetails());
  }, []);
  return (
    <>
    {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
    <Container style={{marginTop:"25px"}}>
      {/*
      <div className="row">
      <h2 className="col-12 mt-4" style={{color:"#2c4964"}}>Technological Innovation</h2>

      <div className="col-lg-6 py-3">
          <div className="img-place mobile-preview shadow wow zoomIn">
            <img
              src="media/InnovationImg.png"
              alt="la"
              style={{ maxHeight: "250px" }}
            />
          </div>
        </div>
        <div className="col-lg-5  py-3  wow fadeInUp">
          
          <p className="mb-4">
            This is the spirit of CSMIND . We strive to bring research to life
            by design thinking , innovations , and incubation to cultivate
            startups and ventures exploring the technology of today , which
            could transform the ways of our present practices in the society ,
            education , management, and industry/professional sectors. We work
            with universities, faculty and talented students and create systems
            for the future .
          </p>
        </div>
        
      </div>
      */}

      <div className="position-realive bg-image">
        <div className="page-section" style={{ paddingTop: "10px" }}>
          <div className="container">
            <h2 center>The present ongoing ventures :</h2>
            <div className="row">
              <div className="col-lg-6 py-3 mt-lg-1">
                <div className="iconic-list">
                  <div className="iconic-item wow fadeInUp">
                    <div className="iconic-md iconic-text bg-warning fg-white rounded-circle">
                      <span className="mai-cube"></span>
                    </div>
                    <div className="iconic-content">
                      <h5>Resilience Management.</h5>
                      <p className="fs-small">
                        A smart city cant reach its goals unless it is also made
                        residential to the threats - which would include threats
                        from disasters , accidents ,and overall health of a
                        city.
                      </p>
                      <a
                        href="#1"
                        className="btn btn-outline-success rounded-pill"
                      >
                        details and registration
                      </a>
                    </div>
                  </div>
                  <div className="iconic-item wow fadeInUp">
                    <div className="iconic-md iconic-text bg-info fg-white rounded-circle">
                      <span className="mai-shield"></span>
                    </div>
                    <div className="iconic-content">
                      <h5>TeamQ project</h5>
                      <p className="fs-small">
                        Today different companies have operations across the
                        globe . A large number of of professionals and experts
                        are deployed on the projects who are best suited for a
                        project.{" "}
                      </p>
                      <a
                        href="#2"
                        className="btn btn-outline-success rounded-pill"
                      >
                        details and registration
                      </a>
                    </div>
                  </div>
                  <div className="iconic-item wow fadeInUp">
                    <div className="iconic-md iconic-text bg-warning fg-white rounded-circle">
                      <span className="mai-analytics"></span>
                    </div>
                    <div className="iconic-content">
                      <h5>DiaM</h5>
                      <p className="fs-small">
                        DiaM is a diabetese management application. Type II
                        diabetese has become a wide spread menace to the health
                        of a common man.
                      </p>
                      <a
                        href="#3"
                        className="btn btn-outline-success rounded-pill"
                      >
                        details and registration
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>{" "}
            <br />
            <div className="row">
              <div
                className="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content"
                data-aos="fade-right"
              >
                <h3 id="1">Resilience Management</h3>
                <ul className="font-Poppins">
                  <br />
                  <li>
                    <i className="icofont-check-circled"></i> A smart city cant
                    reach its goals unless it is also made residential to the
                    threats - which would include threats from disasters ,
                    accidents ,and overall health of a city.{" "}
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i> ResM is a
                    framework to address these challenges using exponential
                    technologies like AI, IT , and GPS deployed upon a robust
                    model based on efficient protocols of communication ,
                    coordination , collaboration and cooperation to bring in
                    clarity in operations of actors involved to make a city
                    relilient to handle eventualities.{" "}
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i> It is a
                    cooperative model between the administration , experts and
                    the society as a whole. The design is based on the research
                    performed to explore use of technology for the benefit of
                    the society to ensure safety ,quick and coordinated response
                    , based on remote data gathered across a city. The model is
                    service orientd and can be deployed at district livel across
                    the country and the globe.{" "}
                  </li>
                </ul>
                <div
                  class="col-lg-10 center order-1 order-lg-2"
                  data-aos="zoom-in"
                  data-aos-delay="150"
                >
                  <div class="video-container">
                    <iframe
                      title="csmind video"
                      src={contentItems.vidresi}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>{" "}
                  </div>
                  <div className="col-lg-12 pl-0 mt-2">
                    <Link
                      to="/innovation/form/Resillience"
                      className="btn btn-primary"
                    >
                      Register & engage with us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div
                className="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content"
                data-aos="fade-right"
              >
                <h3 id="2">TeamQ project</h3>
                <b>A HR product.</b>
                <ul className="font-Poppins">
                  <br />
                  <li>
                    <i className="icofont-check-circled"></i> Today different
                    companies have operations across the globe . A large number
                    of of professionals and experts are deployed on the projects
                    who are best suited for a project . The projects are cyclic
                    and new projects keep on coming , call for deploying the
                    professionals on new projects as well as induct new members
                    in the teams.{" "}
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i> Managing this
                    function by the HR becomes a challanging job . Deployment of
                    a best fit team on a project can ensure effective and
                    efficient compltion of the projects This would lead to
                    customer and employee satisfaction . Matching team
                    compentencies with the project attributes is the key factor
                    and becomes very challenging in real-time environment.{" "}
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i> TeamQ is an AI
                    based service to acomplish a team building to process of a
                    company, on realtime basis, suit an upcoming project
                    imbibing the companies values , strategies and competence .
                    The TeamQ platform needs data of prospective professionls of
                    a company and the project attributes to determine the team.{" "}
                  </li>
                  Further , as another function , individual professionals in
                  the field can also use for their own profiling , improvement
                  in their attributes through training to embark on new
                  challanges.
                </ul>
                <div
                  class="col-lg-10 center order-1 order-lg-2"
                  data-aos="zoom-in"
                  data-aos-delay="150"
                >
                  <div class="video-container">
                    <iframe
                      title="csmind video"
                      src={contentItems.vidteam}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>{" "}
                  </div>
                  <div className="col-lg-12 pl-0 mt-2">
                    <Link
                      to={"/innovation/form/TeamQ"}
                      className="btn btn-primary"
                    >
                      Register & engage with us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <div className="row">
              <div
                className="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content"
                data-aos="fade-right"
              >
                <h3 id="3">DiaM</h3>
                <b>DiaM is a diabetese management application. </b>
                <ul className="font-Poppins">
                  <br />
                  <li>
                    <i className="icofont-check-circled"></i> Type II diabetese
                    has become a wide spread menace to the health of a common
                    man . This is due to the changes in the life style today and
                    it is now called as lifestyle dieses . Ones this dieases is
                    detected then its reversal is impossible and one has to
                    learn to live with it and manage ,which depends on multiple
                    factors . As the age advances it starts affecting the health
                    severly and may become threat yo the life.{" "}
                  </li>
                  <li>
                    <i className="icofont-check-circled"></i>Therefore, proper
                    medication ,continuous monitoring , and self discipline
                    become mandatory. This is generally difficult to accomplish
                    . DiaM is a mobile based AI application innovated to help a
                    person to manage type II diabetese effectively with ease
                    ,comfort and confidence. The application not only does
                    connect to self to build the will power but also connects to
                    the doctor for monitoring and mentoring. The AI engine
                    smartly categorizes one , regulates life style and help
                    understand how one is handling this dieses ,which utilizes a
                    number of human parameters.{" "}
                  </li>
                </ul>
                <div
                  class="col-lg-10 center order-1 order-lg-2"
                  data-aos="zoom-in"
                  data-aos-delay="150"
                >
                  <div class="video-container">
                    <iframe
                      title="csmind video"
                      src={contentItems.viddiam}
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>{" "}
                  </div>
                  <div className="col-6 pl-0 mt-2">
                    <Link
                      to={"/innovation/form/Diam"}
                      className="btn btn-primary"
                    >
                      Register & engage with us
                    </Link>
                  </div>
                  <div className="col-4 pl-0 mt-2">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.microsoft.office.officehubrow"
                      className="btn btn-success"
                      target="_blank"
                    >
                      Download the app
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
    )}
    </>
  );
};

export default InnovationMainScreen;

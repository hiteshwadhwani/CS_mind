import React, { useEffect } from "react";
import "../components/aim.css";
import "../components/innov.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getContentDetails } from "../actions/contentActions";
import Message from "../components/Message";
import Loader from '../components/Loader';
const AimMainScreen = () => {
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
    <div>
      <div class="hero-caption mt-4">
        <div class="container fg-white h-100">
          <div class="row h-100">
            <div class="col-lg-6">
              <h2 class="mb-4 fw-medium" style={{ color: "#2c4964" }}>
                University Consulting
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div
        class="page-section"
        style={{ paddingTop: "10px", paddingBottom: "20px" }}
      >
        <div class="container">
          <div class="row">
            <div class="col-lg-6 py-3">
              <div class="img-place mobile-preview ">
                <img
                  src="media/Aim.png"
                  alt="la"
                  style={{ maxHeight: "300px" }}
                />
              </div>
            </div>
            <div class="col-lg-6  py-3  wow fadeInUp">
              <p class="mb-4">
                We are available to guide and mentor university/colleges to
                achieve excellence in education. Please contact us by signing in
                and submitting your specific concerns.{" "}
              </p>
              <Link
                to="/aim/noform"
                class="btn btn-primary"
                style={{ fontSize: "20px" }}
              >
                registration
              </Link>
            </div>
          </div>
        </div>
      </div>
      <br />

      <div class="page-section" style={{ paddingTop: "30px" }}>
        <div class="container">
          <h3 class="mb-4 haha">
            <strong>University Consulting Includes:</strong>
          </h3>
          <div class="row">
            <div class="col-lg-5 py-3">
              <div class="iconic-list">
                <div class="iconic-content">
                  <h5>- Preparing for the new education paradigm. </h5>
                </div>
                <br />

                <div class="iconic-content">
                  <h5>- Thrusting the research to the ventures.</h5>
                </div>

                <br />

                <div class="iconic-content">
                  <h5>- Designing thinking to Products realization.</h5>
                </div>
              </div>
              <br />
              <div class="iconic-content">
                <h5>- Faculty development and joint ventures. </h5>
              </div>
              <br />
              <div class="iconic-content">
                <h5>- Quality, competitive skills , strategic planning. </h5>
              </div>
              <br />
              <div class="iconic-content">
                <h5>- Building the institutes of excellence. </h5>
              </div>
              <br />
              <div class="iconic-content">
                <h5>- Accreditation. </h5>
              </div>
            </div>

            <div
              class="col-lg-6 center order-1 order-lg-2"
              data-aos="zoom-in"
              data-aos-delay="150"
            >
              <div class="video-container">
                <iframe
                  title="csmind video"
                  src={contentItems.viduni}
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default AimMainScreen;

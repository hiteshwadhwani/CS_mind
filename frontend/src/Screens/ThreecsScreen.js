import React, { useEffect } from "react";
import "../components/threecs.css";
import { Link } from "react-router-dom";
const Threecs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <section id="services" class="section-bg">
        <div class="container">
          <header class="section-header">
            <h3>Offerings</h3>
          </header>

          <div class="row">
            <div
              class="col-md-6 col-lg-6 wow bounceInUp"
              data-wow-duration="1.4s"
            >
              <div class="box">
                <h4 class="title">
                  <Link to="/aim">University & Academic Consulting.</Link>
                </h4>
                <p class="description">
                  We are available to guide and mentor university/colleges to
                  achieve excellence in education. Please contact us by signing
                  in and submitting your specific concerns.
                </p>
                <br />{" "}
                <Link
                  to="/aim"
                  class="btn btn-outline-primary rounded-pill"
                >
                  details and registration
                </Link>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-6 wow bounceInUp"
              data-wow-duration="1.4s"
            >
              <div class="box">
                <h4 class="title">
                  <Link to="/counselling">Professional Mentoring </Link>
                </h4>
                <p class="description">
                  A write advice and mentoring can bring in a definite change in
                  the carrier/profession of a youth and make success easy. Today
                  the youth is looking for some one to be available to guide
                  them on various aspects of education and professional carrier.
                </p>
                <br />{" "}
                <Link
                  to="/counselling"
                  class="btn btn-outline-primary rounded-pill"
                >
                  details and registration
                </Link>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-6 wow bounceInUp"
              data-wow-duration="1.4s"
            >
              <div class="box">
                <h4 class="title">
                  <Link to="/signupfuture">Signature and Beyond</Link>
                </h4>
                <p class="description">
                  {" "}
                  Today, the youth and teens have enormous career opportunities
                  – so are the challenges to fulfill their dreams. Every career
                  needs talent, hard work and opportunities to shine bright.
                </p>
                <br />{" "}
                <Link
                  to="/signupfuture"
                  class="btn btn-outline-primary rounded-pill"
                >
                  learn more
                </Link>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-6 wow bounceInUp"
              data-wow-duration="1.4s"
            >
              <div class="box">
                <h4 class="title">
                  <Link to="/sharpentheskills">Sharpen the skills </Link>
                </h4>
                <p class="description">
                  This is a unique comprehensive program based on hand holding,
                  mentoring, guiding and advising an aspirant to built his/her
                  own venture in a unique networked team environment.
                </p>
                <br />{" "}
                <Link
                  to="/sharpentheskills"
                  class="btn btn-outline-primary rounded-pill"
                >
                  details and registration
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Threecs;

import React from "react";
import "./faq.css";

const Faq = () => {
  return (
    <div>
      <section id="faqs" className="faqs">
        <div className="container">
          <hr />
          <div className="section-title" data-aos="fade-up">
            <h2 className="adminthings">Frequently Asked Questions</h2>
          </div>

          <ul className="faqs-list">
            <li data-aos="fade-up">
              <a data-toggle="collapse" className="collapsed" href="#faq1">
                What is CS MIND ? <i className="bx bx-chevron-down icon-show"></i>
                <i className="bx bx-x icon-close"></i>
              </a>
              <div id="faq1" className="collapse" data-parent=".faqs-list">
                <p>
                  A technology innovation platform for academia,industry , and
                  ,youth.{" "}
                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="100">
              <a data-toggle="collapse" href="#faq2" className="collapsed">
                What is venturing ? <i className="bx bx-chevron-down icon-show"></i>
                <i className="bx bx-x icon-close"></i>
              </a>
              <div id="faq2" className="collapse" data-parent=".faqs-list">
                <p>
                  It helps the youth to dream big and realize their innovative
                  ideas{" "}
                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="300">
              <a data-toggle="collapse" href="#faq4" className="collapsed">
                Can I get personal career mentoring ?{" "}
                <i className="bx bx-chevron-down icon-show"></i>
                <i className="bx bx-x icon-close"></i>
              </a>
              <div id="faq4" className="collapse" data-parent=".faqs-list">
                <p>
                  Individual mentoring sessions for carrier guidance , studies ,
                  research , projects are fecilitated{" "}
                </p>
              </div>
            </li>

            <li data-aos="fade-up" data-aos-delay="400">
              <a data-toggle="collapse" href="#faq5" className="collapsed">
                What is the training program available ?
                <i className="bx bx-chevron-down icon-show"></i>
                <i className="bx bx-x icon-close"></i>
              </a>
              <div id="faq5" className="collapse" data-parent=".faqs-list">
                <p>
                  A program to train individuals for exploring path of
                  innovation ,product development, and realizing venture is
                  provided.{" "}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Faq;

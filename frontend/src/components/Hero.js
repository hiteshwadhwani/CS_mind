import React from "react";
import "./hero.css";

const Hero = ({ contentItems }) => {
  return (
    <div>
      <div class="page-sections">
        <div class="container">
          <strong>
            <font color="white">
              {" "}
              <marquee>
                {" "}
                <i className="fa fa-arrow-left"></i> {contentItems.homeMarquee}{" "}
              </marquee>
            </font>
          </strong>
          <div class="row">
            <div class="col-lg-6 py-1">
              <div class="img-place">
                <img src="SVG/hero.png" alt="img" />
              </div>
            </div>
            <div class="col-lg-3 py-3 mt-lg-5">
              <div class="iconic-list">
                <div class="iconic-item">
                  <div class="iconic-content">
                    <h5>{contentItems.homeHeroHeading}</h5>
                    {/*    <a class="read-more" href="#about">
                      {contentItems.homeHeroButton} <i class="icofont-long-arrow-right"></i>
                    </a>
                    <h5 className="adminthings">NEW NOTICES</h5>
                  <br/>
                  
 */}{" "}
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 py-3 mt-lg-5">
              <div class="iconic-list">
                <div class="iconic-item">
                  <div class="iconic-content">
                  <ul class="pinboards">
<li>
<div>
<small><strong>NEW COURSE NOTIFICATION</strong></small>
<h4>{contentItems.notice1}</h4>
</div>
</li>
</ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <section id="call-to-actions" class="wow fadeInUp">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 text-center text-lg-left">
                  <h3 class="cta-title">
                    {contentItems.homeMissionHeading}{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      class="bi bi-award"
                      viewBox="0 0 16 16"
                    >
                      <path d="M9.669.864L8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193l.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z" />
                      <path d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z" />
                    </svg>
                  </h3>
                  <p class="cta-text">{contentItems.homeMissionContent} </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hero;

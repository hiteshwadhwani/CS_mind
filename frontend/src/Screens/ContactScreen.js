import React,{useEffect} from "react";
import "../components/contact.css";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  }, [])
  return (
    <>
      <div class="page-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-7 py-3 mb-5 mb-lg-0">
              <div class="img-place w-lg-75 wow zoomIn">
                <img src="media/illustration_contact.svg" alt="" />
              </div>
            </div>
            <div class="col-lg-5 py-3">
              <h1 class="wow fadeInUp">
                Need a help? <br />
                Don't worry just contact us
              </h1>
<br/>
              <div class="box">
                <h4 class="title">
                  MAIL: <strong>info@csmind.in</strong>
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

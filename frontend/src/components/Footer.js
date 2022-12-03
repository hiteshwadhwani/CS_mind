import React from "react";
import "./footer.css";
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    
      <footer id="footer">
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 footer-contact">
                <h3>CS MIND</h3>
                <p>
                  <strong>Phone:</strong> +91 9425012972
                  <br />
                  <strong>Email:</strong> info@csmind.in
                  <br />
                </p>
              </div>

              <div className="col-lg-2 col-md-6 footer-links">
                <h4>USEFUL LINKS</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i> <Link to="/">Home</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i> <Link to="/sirprofile">Chairman</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i> <Link to="/privacy">Privacy Policy</Link>
                  </li>
                 
                </ul> 
              </div>

              <div className="col-lg-3 col-md-6 footer-links">
                <h4>Professional offerings</h4>
                <ul>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/innovation">Technology Innovations</Link>
                  </li>
                  <li>
                    <i className="bx bx-chevron-right"></i>{" "}
                    <Link to="/aim">Academic Innovations</Link>
                  </li>
                
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="copyright-wrap d-md-flex py-4">
            <div className="mr-md-auto text-center text-md-left">
              <div className="copyright">
                &copy; Copyright{" "}
                <strong>
                  <span>CS MIND</span>
                </strong>
                .<br /> All Rights Reserved
              </div>
            
            </div>
            <div className="social-links text-center text-md-right pt-3 pt-md-0">
              <a href="twitter" className="twitter">
                <i className="bx bxl-twitter"></i>
              </a>
              <a href="mail" className="email">
                <i className="bx bxl-skype"></i>
              </a>
              <a href="fb" className="facebook">
                <i className="bx bxl-facebook"></i>
              </a>
              <a href="inst" className="instagram">
                <i className="bx bxl-instagram"></i>
              </a>
              <a href="link" className="linkedin">
                <i className="bx bxl-linkedin" ></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    
  );
};

export default Footer;
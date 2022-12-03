import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { useSelector, useDispatch } from "react-redux";

import { getContentDetails } from "../actions/contentActions";
import Message from "../components/Message";
import Loader from '../components/Loader';

const Acad = () => {
  const contentDetails = useSelector((state) => state.contentDetails);
  const { loading, error, contentItems } = contentDetails;
  const dispatch = useDispatch();
    useEffect(()=>{
        window.scrollTo(0,0);
        dispatch(getContentDetails());
    },[])
    return (
      <>
      {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
        <section class="about">
          <hr />
          <div class="container">
            <div class="row">
              <div
                class="col-lg-6 order-1 order-lg-2"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <Fade right>
                  <img src="media/Aim.png" class="img-fluid" alt="academic" />
                </Fade>
              </div>
              <div
                class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content"
                data-aos="fade-right"
              >
                <h3>{contentItems.homeAcademicHeading}</h3>
                <p style={{ textAlign: "justify" }}>
                  {contentItems.homeAcademicContent}
                  <br />
                  A. University Consulting
                  <br />
                  B. Professional Mentoring
                  <br />
                  C. Signature & beyond <br />
                  D.Sharpen the skills.
                  <br />
                </p>
    
                <Link to="/threecs" class="read-more">
                  {contentItems.homeAcademicButton}{" "}
                  <i class="icofont-long-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
        )}
        </>
      );
};

export default Acad;
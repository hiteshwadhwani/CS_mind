import React,{useEffect} from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { useSelector, useDispatch } from "react-redux";

import { getContentDetails } from "../actions/contentActions";
import Message from "../components/Message";
import Loader from '../components/Loader';
const Inno = () => {
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
        <section id="innov" className="about">
          <div class="container">
            <hr/>
            <div class="row">
              <div
                class="col-lg-6 order-1 order-lg-1"
                data-aos="zoom-in"
                data-aos-delay="150"
              >
                <Fade left>
                  <img
                    src="media/InnovationImg.png"
                    class="img-fluid"
                    alt="innovation"
                  />
                </Fade>
              </div>
              <div
                class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-2 content"
                data-aos="fade-right"
              >
                <h3> {contentItems.homeTechnologyHeading}</h3>
                <p>
                {contentItems.homeTechnologyContent} 
                </p>
                
                <Link to="/innovation" class="read-more">
                {contentItems.homeTechnologyButton} <i class="icofont-long-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
        </>
      
      );
};

export default Inno;
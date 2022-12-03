import React, { useEffect } from "react";
import "../components/innov.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getContentDetails } from "../actions/contentActions";
import Message from "../components/Message";
import Loader from '../components/Loader';

const CounsellingMainScreen = () => {
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
    <div className="container mt-3">
      <div className="row">
        <div
          className="col-lg-12 pt-4 pt-lg-0 order-2 order-lg-1 content"
          data-aos="fade-right"
        >
          <h3 id="2">Professional Mentoring</h3>

          <ul className="font-Poppins">
            
            <li>
              <i className="icofont-check-circled"></i> A right advice and
              mentoring can bring in a definite change in the carrier/profession
              of a youth and make success easy. Today the youth is looking for
              some one to be available to guide them on various aspects of
              education and professional carrier. This might include knowing the
              self, education and carrier prospects, choosing the alternatives,
              knowing the opturnities to list a few. We invite the youth to take
              opportunity for their bright carrier through engaging with CS
              Mind.{" "}
            </li>
          </ul>
        </div>
        <div
          class="col-lg-10 center order-1 order-lg-2"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          <div class="video-container">
            <iframe
              title="csmind video"
              src={contentItems.vidpro}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>{" "}
          </div>
          <div className="col-lg-12 pl-0 mt-2">
            <Link to={"/counselling/payment"} className="btn btn-primary">
              Register and Payment
            </Link>
          </div>
        </div>
      </div>
    </div>
    )}
    </>
  );
};

export default CounsellingMainScreen;

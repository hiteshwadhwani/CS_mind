import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/innov.css";
import { useSelector, useDispatch } from "react-redux";
import { getContentDetails } from "../actions/contentActions";
import Message from "../components/Message";
import Loader from '../components/Loader';

const SharpenMainScreen = () => {
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
          <h3 id="2">Sharpen The Skills</h3>

          <ul className="font-Poppins">
            <li>
              <i className="icofont-check-circled"></i> The information
              technology over the last 10 years has grown exponentially, so are
              the opportunities to build innovative systems for society. The
              scope of growth is so large that the smart systems are
              encompassing all the fields including health care, banking,
              automation, entertainment, to name a few. Social media
              applications are some of the examples which are well known of
              there growth and returns which have phinominally given rise to
              economical growth. This trend is fueled by once ability to create,
              with large vision using ever changing technology can bring a
              disruption in the present practices.{" "}
            </li>
            <li>
              <i className="icofont-check-circled"></i>
              Looking to this opportunity we need a competent man power who
              could make an impact to take this scenario of growth to the next
              level. The program presented here is therefore designed to develop
              a competency so that the manpower can aspire to make a
              contribution for the self and for the country.
            </li>
            <li>
              <i className="icofont-check-circled"></i> The details of the
              program are carefully worked out by the experts from academia and
              industry to align/harness the talent of youth so that they can
              prove there worth in this changing world of technology innovation.
              The program can be opted by any one having belive in self to take
              technology innovation challenge in the field of interest. The
              program will go through a complete cycle, right from the basics of
              venture/enterprise, going through the entire product development
              cycle and applying technology skills and business practices to
              stand among successful millennials.
            </li>
            <li>
              <i className="icofont-check-circled"></i>
              This is a unique comprehensive program based on hand holding,
              mentoring, guiding and advising an aspirant to built his/her own
              venture in a unique networked team environment.
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
                src={contentItems.vidsharp}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 pl-0 mt-4">
        <Link to={"/sharpentheskills/payment"} className="btn btn-primary">
          Register and Payment
        </Link>
      </div>
    </div>
    )}
    </>
  );
};

export default SharpenMainScreen;

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../components/prof.css";
import { getContentDetails } from "../actions/contentActions";
import Message from "../components/Message";
import Loader from '../components/Loader';

const SirProfileScreen = () => {
  const dispatch=useDispatch();
  const contentDetails = useSelector((state) => state.contentDetails);
  const { loading, error, contentItems } = contentDetails;
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getContentDetails());
  }, []);
  return (
    <>
    {loading?<Loader/>:error?<Message variant='danger'>{error}</Message>:(
    <section id="about" className="about mt-3" >
      <div className="container">
        <div className="section-title" data-aos="fade-up">
          <h2>CHAIRMAN</h2>
          <h4 style={{ color: "black" }}>
            <b>Dr. Pradip K Chande</b>
          </h4>
        </div>

        <div className="row">
          <div className="col-lg-3" data-aos="fade-right">
            <div className="image">
              <img src="prpkchande.jpg" className="img-fluid" alt="dp" />
            </div>
          </div>
          <div className="col-lg-9" data-aos="fade-left">
            <div className="content pt-4 pt-lg-0 pl-0 pl-lg-3 ">
              <h3>Brief Profile</h3>
              <p className="font-italic">
                {contentItems.chairBrief}
              </p>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-left">
            <div className="content pt-4 pt-lg-0 pl-0 pl-lg-3 ">
              <h3>Administration and Leadership</h3>
              <p>
                {contentItems.chairAdmin}
              </p>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-left">
            <div className="content pt-4 pt-lg-0 pl-0 pl-lg-3 ">
              <h3>Academic and Professional Activities</h3>
              <p>
                {contentItems.chairAcad}
              </p>
            </div>
          </div>

          <div className="col-lg-12" data-aos="fade-left">
            <div className="content pt-4 pt-lg-0 pl-0 pl-lg-3 ">
              <h3>Research and Current Interest</h3>
              <p>
                {contentItems.chairResearch}
              </p>
            </div>
          </div>
          <div className="col-lg-12" data-aos="fade-left">
            <div className="content pt-4 pt-lg-0 pl-0 pl-lg-3 ">
              <h3>Award and Honors</h3>
              <p>
                {contentItems.chairAward}
              </p>
              <strong>
                <hr />
                -Prof. P K Chande
              </strong>
            </div>
          </div>
          <br />
        </div>
      </div>
    </section>)}
    </>
  );
};

export default SirProfileScreen;

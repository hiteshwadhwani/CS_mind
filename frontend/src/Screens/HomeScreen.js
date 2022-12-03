import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Hero from "../components/Hero";
import Innovation from "../components/Innovation";
import AIM from "../components/AIM";
import Message from "../components/Message";
import Loader from "../components/Loader";
import AboutHome from "../components/AboutHome";

import { getContentDetails } from "../actions/contentActions";
import Faq from "../components/Faq";
const HomeScreen = () => {
  const contentDetails = useSelector((state) => state.contentDetails);
  const { loading, error, contentItems } = contentDetails;
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getContentDetails());
  }, []);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Hero contentItems={contentItems} />
          <AboutHome contentItems={contentItems} />
          <Innovation contentItems={contentItems} />
          <AIM contentItems={contentItems} />
          <Faq />
        </>
      )}
    </>
  );
};

export default HomeScreen;
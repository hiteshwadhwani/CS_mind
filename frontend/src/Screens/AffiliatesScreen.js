import React, { useEffect } from "react";
import "../components/affi.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listAffs } from "../actions/affActions";

const Affiliates = () => {
  const affList = useSelector((state) => state.affList);
  const { loading, error, affs } = affList;
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listAffs());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
    <div>
      <section id="featured" class="featured">
        <div class="container">
          <div class="section-title" data-aos="fade-up">
            <h2>Renowned Experts</h2>
            <p>Techno Leaders</p>
          </div>
          {
            affs.map((aff)=>(
              <>
                <div class="row">
            <div class="col-lg-2" data-aos="fade-right">
              <figure>
                <img src={aff.image}  class="img-fluid" />
              </figure>
            </div>
            <div class="col-lg-10 mt-4 mt-lg-0" data-aos="fade-left">
              <h4>{aff.name}</h4>
              <p>
                {aff.info}
              </p>
              {" "}
              <a data-toggle="collapse" href={`#faq${aff.sequence}`} class="collapsed">
                Words From {aff.name}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-caret-down-square"
                  viewBox="0 0 18 18"
                >
                  <path d="M3.626 6.832A.5.5 0 0 1 4 6h8a.5.5 0 0 1 .374.832l-4 4.5a.5.5 0 0 1-.748 0l-4-4.5z" />
                  <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z" />
                </svg>
              </a>
              <div id={`faq${aff.sequence}`} class="collapse" data-parent=".faq-list">
                <p>
                  {aff.words}{" "}
                </p>
              </div>
            </div>
          </div>
<hr/>
              </>
            ))
          }

          
          <ul class="faq-list"></ul>
        </div>
      </section>
    </div>
      )}
      </>
  );
};

export default Affiliates;

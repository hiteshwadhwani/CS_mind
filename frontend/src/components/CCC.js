import React from "react";
import Fade from 'react-reveal/Fade';
import {Link} from 'react-router-dom';
const CCC = () => {
  return (
    
    <section id="about" class="about">
      <div class="container">
        <div class="row">
          <div
            class="col-lg-6 order-1 order-lg-1"
            data-aos="zoom-in"
            data-aos-delay="150"
          >
              <Fade left>
            <img src="media/3C.png" class="img-fluid" alt="" />
            </Fade>
          </div>
          <div
            class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-2 content"
            data-aos="fade-right"
          >
            <h3>3C at CS MIND</h3>
            <p  style={{textAlign:"justify"}}>
              Counseling , Continuous improvement and Commitment to self are the
              Career growth factors which can’t be ignored . At CS MIND we
              strive to enrich these for the career growth . Sailing on the
              competitive and varied opportunities canvas , with out proper
              mentoring may lead someone no where . Whether it is choosing
              programs , playing a big role , career growth , etc ., are
              difficult to decide . Other interesting aspect is the commitment ;
              self commitment and whenever we put our signature, we actually
              commit something important . Signature does represent a
              personality and lead to prospects . which is generally ignored .
              Here we facilitate , not only counseling but how to sign up the
              commitment .
            </p>

            <Link to="/threecs" class="read-more">
              Register and Engage <i class="icofont-long-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </section>
    
  );
};

export default CCC;

import React from "react";
import './about.css';
const AboutHome = ({contentItems}) => {
  return (
    <section id="about" class="about">
    <div class="container">

      <div class="row">
        <div class="col-lg-6 order-1 order-lg-2" data-aos="zoom-in" data-aos-delay="150">
            <div class="video-container">
            <iframe title="csmind video" width="560" height="315" src={contentItems.homeCsmindVideo} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>  </div>
        </div>
        <div class="col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content" data-aos="fade-right">
          <h3>{contentItems.homeCsmindHeading} </h3>
          <strong style={{color:"black",fontWeight:"600"}}>{contentItems.homeCsmindSubHeading}</strong>
           <ul class="font-Poppins">
               <br/>
            <li><i class="icofont-check-circled"></i> {contentItems.homeCsmindContent}</li>
                     </ul>
        
        </div>
      </div>

    </div>
  </section>
  );
};

export default AboutHome;

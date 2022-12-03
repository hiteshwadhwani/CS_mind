import React from 'react'
import './prof.css';
import {Link } from "react-router-dom";

const Prof = () => {
    return (
        <section id="about" class="about">
        <div class="container">
  
          <div class="section-title" data-aos="fade-up">
            <h2>CHAIRMAN</h2>
            <p><b>Dr. Pradip K Chande</b></p>
          </div>
  
          <div class="row">
            <div class="col-lg-3" data-aos="fade-right">
              <div class="image">
                <img src="prpkchande.jpg" class="img-fluid" alt="dp"/>
              </div>
            </div>
            <div class="col-lg-9" data-aos="fade-left">
              <div class="content pt-4 pt-lg-0 pl-0 pl-lg-3 ">
                <h3>Brief Profile</h3>
                <p class="font-italic">
                I have  more than 40 years of proven experience in institute building :  teaching, research,  consulting, management  ,  administration and have  had occupied many key positions as Director in past 20 years  . Recently superannuated from  the Director’s position  at   the School of Business Management  , MNIMS , Indore .Presently  lead d a large team of young  innovators  to make their future and  incubating products for social use .
                </p>
                <h3>Administration and Leadership</h3>
                <p>
                I headed Shri. GS Institute of Technology and Science, Indore,  as its Director . This  is one of the  premier  autonomous   institutions in the country . I had led its grand Golden Jubilee Celebrations in 2002; established a Technology Incubation Center with   Govt. grants -  the then  President of India , Dr APJ Abdul Kalam had laid  its  foundation stone; I played a leading role  to pursue  the Deemed- to- be- University project  of the institute,  had obtained notable  grants from  the  World Bank Project IMPECT and  TEQIP, and had   also  worked as a counselor and auditor for this project in the state.
                </p>
                <br/> 
               
      </div>
                
            </div>
            <div class="col-lg-12" data-aos="fade-left">
              <div class="content pt-4 pt-lg-0 pl-0 pl-lg-3 ">
              <h3>Academic and  Professional Activities</h3>
                <p>
                At SGSITS Indore, as  a Professor  and Head of Computer Engineering , I was  responsible for the  World Bank IMPACT project  as its coordinator,  acted as  the General Chair of the  International Conference on Automation - ICAUTO-95, sponsored by SICE ( the Society for Control and Instrument Engineers  ) Japan. As a Professor I have  edited/reviewed many journals/ conferences proceedings in this  area of  research .  I also   conducted workshops in Japan and Malaysia on Intelligent Robotics and Smart Vehicular Systems while  I was   visiting Professor at Kumamoto University, Japan. I have delivered a number of invited talks in  the areas of Management and Automation on various platforms.  </p>
                <Link to="/sirprofile"  data-aos="fade-up" class="read-more  scrollto">Read More</Link>
              </div>
              </div>
          </div>
        </div>
      </section>
    )
}

export default Prof
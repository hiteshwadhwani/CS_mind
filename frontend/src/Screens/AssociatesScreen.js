import React, { useEffect } from "react";
import "../components/associates.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listFaculities } from "../actions/facultyActions";
const Associates = ({history}) => {
  const facultyList = useSelector((state) => state.facultyList);
  const { loading, error, faculties } = facultyList;
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listFaculities());
  }, [dispatch]);
  return (
    <>
    {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
      <section id="team" class="team">
        <div class="container">
          <div class="section-title" data-aos="fade-up">
            <h2>Faculty Advisor & Consulting Scientist</h2>
          </div>

          <div class="row">
            {
              faculties.map((faculty)=>(
                <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
                <div class="member" data-aos="zoom-in" data-aos-delay="200">
                  <div class="member-img">
                    <img
                      src={faculty.image}
                      class="img-fluid"
                      alt="person3"
                    />
                  </div>
                  <div class="member-info">
                    <h4>{faculty.name}</h4>
                    <span>
                      {faculty.position}
                    </span>
                    <span>
                      {faculty.college}
                    </span>
                    <p>
                      {faculty.project}
                    </p>
                  </div>
                </div>
              </div>
              ))
            }
            
            

            

           
          </div>
          

          
        </div>


      </section>
      )}
    </>
  );
};

export default Associates;

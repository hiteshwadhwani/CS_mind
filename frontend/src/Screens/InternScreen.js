import React, { useEffect } from "react";
import "../components/associates.css";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listInterns } from "../actions/internActions";
import {Link} from 'react-router-dom';



const Interns = ({ history }) => {
  const internList = useSelector((state) => state.internList);
  const { loading, error, interns } = internList;
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(listInterns());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <section id="team" class="team">
            <div class="container">
              <div class="section-title" data-aos="fade-up">
                <h2>Interns</h2>
                <p style={{color:"black", textAlign:"justify"}}>
                  <b>Internship opportunities:</b> The CS MIND invites the
                  students at UG and PG levels to seek internships to work on
                  innovative projects which could benefit them in their career.
                  They can also build their own entrepreneurship opportunities
                  while completing the internship. On successful completion, one
                  will be eligible for a certification of completion of the
                  internship. The internship is always competitive and will be
                  based on merit. You could contact us at{" "}
                  <strong>info@csmind.in</strong>.
                </p>

               <Link to='/internForm'><button className="btn btn-info">Apply</button></Link>
              </div>

              <div class="row">
                {interns.map((intern) => (
                  <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
                    <div class="member" data-aos="zoom-in">
                      <div class="member-img">
                        <img
                          src={intern.image}
                          class="img-fluid"
                          alt="person 1"
                        />
                        
                      </div>
                      <div class="member-info">
                        <h4>{intern.name}</h4>
                        <span>{intern.degree} </span>
                        <span>{intern.college}</span>
                        <p>{intern.project}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Interns;

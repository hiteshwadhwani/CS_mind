import React,{useEffect} from "react";
import "../components/signup.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getContentDetails } from "../actions/contentActions";
import Message from "../components/Message";
import Loader from '../components/Loader';

const SignUpScreen = () => {
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
    <div>
      <section id="intro" class="clearfix">
        <div class="container d-flex h-100">
          <div class="row justify-content-center align-self-center">
            <div class="col-md-6 intro-info order-md-first order-last">
              <h2>
                {" "}
                <span>
                  SIGNATURE{" "}
                  <svg
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    class="bi bi-pen-fill"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"
                    />
                  </svg>
                </span>
                <br />
                And BEYOND
              </h2>
              <div>
                <Link to="/commitment/payment" class="btn-get-started scrollto">
                  Register and Payment
                </Link>
              </div>
            </div>

            <div class="col-md-6 intro-img order-md-last order-first">
              <img src="images/intro-img.png" alt="" class="img-fluid" />
            </div>
          </div>
        </div>
      </section>

      <section id="signup">
        <div class="container">
          <div class="row mb-0">
            <div class="col-lg-2 col-md-6">
              <div class="signup-img">
                <img src="images/anitamam.jpg" alt="Anita Chande" />
              </div>
            </div>

            <div class="col-lg-10 col-md-6">
              <div class="signup-content">
                <h2>About Sign Up the Future</h2>
                <h3>Friends, </h3>
                <p>
                  {" "}
                  Today, the youth and teens have enormous career opportunities
                  – so are the challenges to fulfill their dreams. Every career
                  needs talent, hard work and opportunities to shine bright. To
                  follow this path one would need favoring conditions too, to be
                  able to sail smoothly and meet the desired milestones of your
                  aspirations.
                </p>
              </div>
            </div>

            <div class="col-md-12 mt-0 signup-content">
              <p>
                We have seen that for few, climbing the career ladder comes very
                smooth, while for others it is very tedious. We tend to find the
                reasons and try to make our journey of life conducive enough so
                that we are not left behind. Certainly, there is no substitute
                to the blessings of your dear ones. But the humanity has known,
                evolved and developed other aspects to attract good fortune –
                such as taking help of VASTU, Numerology, Good times, YANTRAS,
                Astrology etc. However, no attention is paid to the aspect which
                can come out of your own spirit and hands. Yes, the thoughts,
                the words and the hand writing are so very effective aspects to
                fulfill the aspirations. Amongst all, the most effective is your
                own “Signature”, which is a powerful aspect and driver of your
                life which represent you on any document you sign. Signature, in
                fact has potential to witness our deeds that we do. Having an
                appropriate signature, right from the beginning act like a push
                in the right direction which can prove you lucky.{" "}
              </p>
              <p>
                <b>
                  We, at CS-MIND has taken up this need in a very holistic
                  manner where we help you design and adopt a potential
                  signature to alter the course of your destiny. Yes, our team
                  of calligraphers, signature evaluators and numerologists
                  creates signature to suit your aspirations and career growth.
                </b>
              </p>
              <p>
                Creating a signature which will last for life time is a first
                right step towards success and we welcome you at CS-Mind in this
                journey of your success.
              </p>
              <strong>
                - Anita Chande
                <hr />
              </strong>
             
            </div>
          </div>
          <div
            class="col-lg-10 center order-1 order-lg-2"
            data-aos="zoom-in"
            data-aos-delay="150"
          >
             <br/>
            <div class="video-container mt-2">
              <iframe
                title="csmind video"
                src={contentItems.vidsig}
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>{" "}
            </div>
          </div>
        </div>
      </section>
    </div>
    )}
    </>
  );
};

export default SignUpScreen;

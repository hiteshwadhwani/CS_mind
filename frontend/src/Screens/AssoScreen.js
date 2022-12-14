import React,{useEffect} from "react";
import "../components/aim.css";
import { Link } from "react-router-dom";

const Asso = () => {
    useEffect(()=>{
        window.scrollTo(0,0);
    },[])
  return (
    <div className="mt-5">
      <div class="hero-caption">
        <div class="container fg-white h-100">
          <div class="row justify-content-center align-items-center text-center h-100" >
            <div class="col-lg-6">
              <h2 class="mb-4 fw-medium" style={{backgroundColor:"rgb(243,248,214)",textAlign:"center"}}>
                Associates{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-shield-fill-check"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 .5c-.662 0-1.77.249-2.813.525a61.11 61.11 0 0 0-2.772.815 1.454 1.454 0 0 0-1.003 1.184c-.573 4.197.756 7.307 2.368 9.365a11.192 11.192 0 0 0 2.417 2.3c.371.256.715.451 1.007.586.27.124.558.225.796.225s.527-.101.796-.225c.292-.135.636-.33 1.007-.586a11.191 11.191 0 0 0 2.418-2.3c1.611-2.058 2.94-5.168 2.367-9.365a1.454 1.454 0 0 0-1.003-1.184 61.09 61.09 0 0 0-2.772-.815C9.77.749 8.663.5 8 .5zm2.854 6.354a.5.5 0 0 0-.708-.708L7.5 8.793 6.354 7.646a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3-3z"
                  />
                </svg>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div class="container">
        <div class="row">
          <div class="col-lg-12 offset-lg-0 py-3 wow fadeInUp">
            <p class="mb-2 text-justify">
            The philosophy of the CS MInd is to associate with any resource who is willing to work with us
as a team, depending on the expertise available with them. This provides a great strength to the
virtual team of the CS Mind. We welcome all such professionals to be a part of our team in
suitable capacity in a win-win environment. We believe Working together can provide us with
incomparable strengths. We may be contacted using our email.{" "}
            </p>
          </div>
          <div className="wow fadeInUp col-lg-12 ">
            <Link to={"/login"} className="btn btn-primary  rounded-pill">
              Login
            </Link>
          </div>
        </div>
      </div>

      <br />
    </div>
  );
};

export default Asso;

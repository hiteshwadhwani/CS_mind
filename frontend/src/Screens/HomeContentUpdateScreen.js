import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getContentDetails, updateContent } from "../actions/contentActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const HomeContentUpdateScreen = ({ location, history }) => {
  const [homeMarquee, sethomeMarquee] = useState("");
  const [homeHeroHeading, sethomeHeroHeading] = useState("");
  const [homeHeroButton, sethomeHeroButton] = useState("");
  const [homeMissionHeading, sethomeMissionHeading] = useState("");
  const [homeMissionContent, sethomeMissionContent] = useState("");
  const [homeCsmindHeading, sethomeCsmindHeading] = useState("");
  const [homeCsmindSubHeading, sethomeCsmindSubHeading] = useState("");
  const [homeCsmindVideo, sethomeCsmindVideo] = useState("");
  const [homeCsmindContent, sethomeCsmindContent] = useState("");
  const [homeTechnologyHeading, sethomeTechnologyHeading] = useState("");
  const [homeTechnologyContent, sethomeTechnologyContent] = useState("");
  const [homeTechnologyButton, sethomeTechnologyButton] = useState("");
  const [homeAcademicHeading, sethomeAcademicHeading] = useState("");
  const [homeAcademicContent, sethomeAcademicContent] = useState("");
  const [homeAcademicButton, sethomeAcademicButton] = useState("");
  const [counselPrice, setcounselPrice] = useState("");
  const [signupPrice, setsignupPrice] = useState("");
  const [teamqPrice, setteamqPrice] = useState("");
  const [diamPrice, setdiamPrice] = useState("");
  const [resPrice, setresPrice] = useState("");
  const [uniPrice, setuniPrice] = useState("");
  const [sharpPrice, setsharpPrice] = useState("");
  const [chairBrief,setchairBrief]=useState("");
  const [chairAdmin,setchairAdmin]=useState("");
  const [chairAcad,setchairAcad]=useState("");
  const [chairResearch,setchairResearch]=useState("");
  const [chairAward,setchairAward]=useState("");
  const [vidresi,setVidresi]=useState("");
  const [viddiam,setViddiam]=useState("");
  const [vidteam,setVidteam]=useState("");
  const [viduni,setViduni]=useState("");
  const [vidpro,setVidpro]=useState("");
  const [vidsig,setVidsig]=useState("");
  const [vidsharp,setVidsharp]=useState("");
  const [notice1,setNotice1]=useState("");

  const dispatch = useDispatch();
  const contentDetails = useSelector((state) => state.contentDetails);
  const { loading, error, contentItems } = contentDetails;
  const contentUpdate = useSelector((state) => state.contentUpdate);
  const { loading: updateLoading, error: updateError, success } = contentUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (!userInfo && !userInfo.isAdmin) {
      history.push("/login");
      

    } else if(!contentItems.homeMarquee){
     dispatch(getContentDetails()) 
    } else {
      sethomeMarquee(contentItems.homeMarquee);
      sethomeHeroHeading(contentItems.homeHeroHeading);
      sethomeHeroButton(contentItems.homeHeroButton);
      sethomeMissionHeading(contentItems.homeMissionHeading);
      sethomeMissionContent(contentItems.homeMissionContent);
      sethomeCsmindHeading(contentItems.homeCsmindHeading);
      sethomeCsmindSubHeading(contentItems.homeCsmindSubHeading);
      sethomeCsmindVideo(contentItems.homeCsmindVideo);
      sethomeCsmindContent(contentItems.homeCsmindContent);
      sethomeTechnologyHeading(contentItems.homeTechnologyHeading);
      sethomeTechnologyContent(contentItems.homeTechnologyContent);
      sethomeTechnologyButton(contentItems.homeTechnologyButton);
      sethomeAcademicHeading(contentItems.homeAcademicHeading);
      sethomeAcademicContent(contentItems.homeAcademicContent);
      sethomeAcademicButton(contentItems.homeAcademicButton);
      setcounselPrice(contentItems.counselPrice);
      setsignupPrice(contentItems.signupPrice);
      setteamqPrice(contentItems.teamqPrice);
      setdiamPrice(contentItems.diamPrice);
      setresPrice(contentItems.resPrice);
      setuniPrice(contentItems.uniPrice); 
      setsharpPrice(contentItems.sharpPrice); 
      setchairAcad(contentItems.chairAcad);
      setchairAdmin(contentItems.chairAdmin);
      setchairBrief(contentItems.chairBrief);
      setchairResearch(contentItems.chairResearch);
      setchairAward(contentItems.chairAward);
      setVidresi(contentItems.vidresi);
      setViddiam(contentItems.viddiam);
      setVidteam(contentItems.vidteam);
      setViduni(contentItems.viduni);
      setVidpro(contentItems.vidpro);
      setVidsig(contentItems.vidsig);
      setVidsharp(contentItems.vidsharp);
      setNotice1(contentItems.notice1);
    }
  }, [userInfo, dispatch, history, success,contentItems]);

  const submitHandler = (e) => {
    e.preventDefault();
    const order = {
      homeMarquee,
      homeHeroHeading,
      homeHeroButton,
      homeMissionHeading,
      homeMissionContent,
      homeCsmindHeading,
      homeCsmindSubHeading,
      homeCsmindContent,
      homeCsmindVideo,
      homeTechnologyHeading,
      homeTechnologyContent,
      homeTechnologyButton,
      homeAcademicHeading,
      homeAcademicContent,
      homeAcademicButton,
      counselPrice,
      signupPrice,
      diamPrice,
      teamqPrice,
      resPrice,
      uniPrice,
      sharpPrice,
      chairBrief,
      chairAcad,
      chairAdmin,
      chairResearch,
      chairAward,
      viddiam,
      vidresi,
      vidteam,
      viduni,
      vidpro,
      vidsig,
      vidsharp,
      notice1
    };
    dispatch(updateContent(order));
  };
  return (
    <Container style={{marginTop:"25px"}}>
      <h3 className="adminthings">Home Page Content Edit </h3>
      <hr/>
      <>
        {updateLoading ? (
          <Loader />
        ) : updateError ? (
          <Message variant="danger">{updateError}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group>
              <Form.Label>home maruqee</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeMarquee}
                onChange={(e) => sethomeMarquee(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home hero heading</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeHeroHeading}
                onChange={(e) => sethomeHeroHeading(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home hero button</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeHeroButton}
                onChange={(e) => sethomeHeroButton(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home mission heading</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeMissionHeading}
                onChange={(e) => sethomeMissionHeading(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home mission content</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeMissionContent}
                onChange={(e) => sethomeMissionContent(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home csmind heading</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeCsmindHeading}
                onChange={(e) => sethomeCsmindHeading(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home csmind sub heading</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeCsmindSubHeading}
                onChange={(e) => sethomeCsmindSubHeading(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home csmind content </Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeCsmindContent}
                onChange={(e) => sethomeCsmindContent(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home cs mind video link</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeCsmindVideo}
                onChange={(e) => sethomeCsmindVideo(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home technology heading</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeTechnologyHeading}
                onChange={(e) => sethomeTechnologyHeading(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home technology content</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeTechnologyContent}
                onChange={(e) => sethomeTechnologyContent(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home technology button</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeTechnologyButton}
                onChange={(e) => sethomeTechnologyButton(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home academic heading</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeAcademicHeading}
                onChange={(e) => sethomeAcademicHeading(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home academic content</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeAcademicContent}
                onChange={(e) => sethomeAcademicContent(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>home academic button</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={homeAcademicButton}
                onChange={(e) => sethomeAcademicButton(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br/>
            <hr/>
            <h3 className="adminthings">Price Edit Section</h3>
            <hr/>
            <Form.Group>
              <Form.Label style={{color:"red"}}>counsel price</Form.Label>
              <Form.Control
                type="number"
                
                value={counselPrice}
                onChange={(e) => setcounselPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{color:"red"}}>signature price</Form.Label>
              <Form.Control
                type="number"
                
                value={signupPrice}
                onChange={(e) => setsignupPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{color:"red"}}>teamq price</Form.Label>
              <Form.Control
                type="number"
                
                value={teamqPrice}
                onChange={(e) => setteamqPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{color:"red"}}>diam price</Form.Label>
              <Form.Control
                type="number"
                
                value={diamPrice}
                onChange={(e) => setdiamPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{color:"red"}}>university couselling price</Form.Label>
              <Form.Control
                type="number"
                
                value={uniPrice}
                onChange={(e) => setuniPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{color:"red"}}>Resillience price</Form.Label>
              <Form.Control
                type="number"
                
                value={resPrice}
                onChange={(e) => setresPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{color:"red"}}>Sharpen the skills price</Form.Label>
              <Form.Control
                type="number"
                
                value={sharpPrice}
                onChange={(e) => setsharpPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br/>
            <hr/>
            <h3 className="adminthings">Chairman Content</h3>
            <hr/>
            <Form.Group>
              <Form.Label>Brief Profile</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={chairBrief}
                onChange={(e) => setchairBrief(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Administration and Leadership</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={chairAdmin}
                onChange={(e) => setchairAdmin(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Academic and Professional Activities</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={chairAcad}
                onChange={(e) => setchairAcad(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Research and Current Interest</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={chairResearch}
                onChange={(e) => setchairResearch(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Awards and Honours</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                value={chairAward}
                onChange={(e) => setchairAward(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br/>
            <hr/>
            <h3 className="adminthings">Video Links</h3>
            <hr/>
            <Form.Group>
              <Form.Label>Resilience Video Link</Form.Label>
              <Form.Control
                type="text"
                value={vidresi}
                onChange={(e) => setVidresi(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Diam Video Link</Form.Label>
              <Form.Control
                type="text"
                value={viddiam}
                onChange={(e) => setViddiam(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Teamq Video Link</Form.Label>
              <Form.Control
                type="text"
                value={vidteam}
                onChange={(e) => setVidteam(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>University Consulting Video Link</Form.Label>
              <Form.Control
                type="text"
                value={viduni}
                onChange={(e) => setViduni(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Professional Mentoring Video Link</Form.Label>
              <Form.Control
                type="text"
                value={vidpro}
                onChange={(e) => setVidpro(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Signature Video Link</Form.Label>
              <Form.Control
                type="text"
                value={vidsig}
                onChange={(e) => setVidsig(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Sharpen the skills Video Link</Form.Label>
              <Form.Control
                type="text"
                value={vidsharp}
                onChange={(e) => setVidsharp(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <br/>
            <hr/>
            <h3 className="adminthings">Notice Section</h3>
            <hr/>
            <Form.Group>
              <Form.Label>Notice Description</Form.Label>
              <Form.Control
                type="text"
                as='textarea'
                value={notice1}
                onChange={(e) => setNotice1(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit">update content</Button>
          </Form>
        )}
      </>
    </Container>
  );
};

export default HomeContentUpdateScreen;

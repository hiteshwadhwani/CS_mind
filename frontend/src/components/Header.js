import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import './header.css'

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };
  return (
    <header style={{ marginBottom: "30px" }}>
      <Navbar
        fixed="top"
        bg="white"
        variant="light"
        style={{ paddingTop: "10px" }}
        expand="lg"
        collapseOnSelect
      >
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <LinkContainer to="/">
          <Navbar.Brand>
            <img
              src="/logo.jpg"
              style={{ height: "auto", width: "120px" }}
              alt="cslogo"
            />
          </Navbar.Brand>
        </LinkContainer>

        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ml-auto">
            <LinkContainer to="/">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/sirprofile">
              <Nav.Link>Chairman</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/associates">
              <Nav.Link>Advisers</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/interns">
              <Nav.Link>Interns</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/affiliates">
              <Nav.Link>Affiliates</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/asso">
              <Nav.Link>Associates</Nav.Link>
            </LinkContainer>
            
            <LinkContainer to="/contact">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
            <NavDropdown
              style={{ marginRight: "0px" }}
              title="Portfolio"
              id="username"
            >
              
              <LinkContainer to="/inno">
                <NavDropdown.Item> Technology Innovations </NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to="/acad">
                <NavDropdown.Item> Academic Innovations </NavDropdown.Item>
              </LinkContainer>
              
            </NavDropdown>

            
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="username">
                <LinkContainer to="/profile">
                  <NavDropdown.Item>
                    {" "}
                    <i
                      className="fas fa-user"
                      aria-hidden="true"
                    ></i> Profile{" "}
                  </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}>
                  <i className="fa fa-sign-out-alt" aria-hidden="true"></i>{" "}
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Sign In
                </Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isAdmin && (
                <LinkContainer to="/admin/dashboard">
                <Nav.Link>Admin Dash</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isCal && (
              <LinkContainer to="/cal/dashboard">
                <Nav.Link>Cal Dash</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isReader && (
              <LinkContainer to="/reader/dashboard">
                <Nav.Link>Reader Dash</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isTrainer && (
              <LinkContainer to="/admin/sharpenlist">
                <Nav.Link>Trainer Dash</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isCommitmentAdmin && (
             <LinkContainer to="/admin/commitmentlist">
             <Nav.Link>Commitments</Nav.Link>
           </LinkContainer> 
            )}
                {userInfo && userInfo.isAcademic && (
             <LinkContainer to="/admin/aimlist">
             <Nav.Link>Academic Dash</Nav.Link>
           </LinkContainer>
            )}
            {userInfo && userInfo.isTechAdmin &&(
                <LinkContainer to="/admin/innovationlist">
                <Nav.Link>Tech Dash</Nav.Link>
              </LinkContainer>
            )}
            {userInfo && userInfo.isCounselor &&(
              <LinkContainer to="/admin/counsellinglist">
              <Nav.Link>Counsel Dash</Nav.Link>
            </LinkContainer>
              )}
          </Nav>
        </Navbar.Collapse>
         
           
      </Navbar>
    </header>
  );
};

export default Header;
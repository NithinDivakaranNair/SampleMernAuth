import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { useLogoutadminMutation } from '../slices/adminApiSlice';
import { Adminlogout } from '../slices/authAdminSlice';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
  const { adminInfo } = useSelector((state) => state.authAdmin);
  console.log("ADMINInfo",{adminInfo});


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutadmin] = useLogoutadminMutation();

   
  const adminLogoutHandler = async () => {
    try {
      await logoutadmin().unwrap();
      dispatch(Adminlogout()); // Use the correct action for admin logout
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="header">
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/adminuserdetails">
            <Navbar.Brand>Admin</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              
              { adminInfo ? (
                <NavDropdown title={adminInfo.name} id="adminUsername">
                  <NavDropdown.Item onClick={adminLogoutHandler}>Admin logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                   <LinkContainer to="/adminlogin">
                    <Nav.Link>Admin login</Nav.Link>
                  </LinkContainer>
                </>
              )}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default AdminHeader;

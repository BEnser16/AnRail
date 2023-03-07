import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse
} from 'mdb-react-ui-kit';
import AuthService from '../../service/auth-service';

const NavComponent = (props:any) => {
  const [showNavColor, setShowNavColor] = useState(false);
  const [showNavColorSecond, setShowNavColorSecond] = useState(false);
  const [showNavColorThird, setShowNavColorThird] = useState(false);
  let {currentUser , setCurrentUser} = props;
  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout successfully! now redirect to the home page. ");  
    setCurrentUser(null);
  };

  return (
    <nav >
      <MDBNavbar expand='lg' dark bgColor='dark' >
        <MDBContainer fluid className='m-2'>
          <MDBNavbarBrand href='#'>動物醫院</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav className='me-auto mb-2 mb-lg-0 d-flex '>

              {currentUser && (
                 <MDBNavbarItem >
                    <MDBNavbarLink href='/hospitalhome'>病歷</MDBNavbarLink>
                </MDBNavbarItem>
              )}

              {currentUser && (
                <MDBNavbarItem >
                  <MDBNavbarLink href='/add-info'>新增病歷</MDBNavbarLink>
                </MDBNavbarItem>
              )}

              
              {currentUser && (
                <MDBNavbarItem className='ms-auto'>
                  <MDBNavbarLink onClick={handleLogout} href='/'>登出</MDBNavbarLink>
                </MDBNavbarItem>
              )}
              
              {!currentUser && (
                <MDBNavbarItem >
                  <MDBNavbarLink href='/register'>註冊</MDBNavbarLink>
                </MDBNavbarItem>
              )}
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>
    </nav>
  );
}

export default NavComponent
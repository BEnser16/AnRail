import React, { useState } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBBtn,
  MDBCollapse
} from 'mdb-react-ui-kit';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

export default function HomeComponent() {
  const [showBasic, setShowBasic] = useState(false);
  const notify = () => toast("Wow so easy !");

  return (
    <header className='h-75'>
      <div className='p-5 text-center bg-light h-50' >
        <h1 className='mt-4 mb-3'>寵物醫院系統</h1>
        <h4 className='mb-3'>Lorem ipsum dolor sit amet.</h4>
        <MDBBtn tag="a" outline size="lg" onClick={notify} >
          START
        </MDBBtn>
      </div>
      <ToastContainer />
    </header>
  );
}
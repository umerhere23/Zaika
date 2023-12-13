import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Footer from './footer';
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from 'mdb-react-ui-kit';

const UserRecipes = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Add your login logic here
    // For example, you can make an API request to authenticate the user

    // Notify the user (for demonstration purposes)
    toast.success('Login successful!');
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center h-100'>
          <MDBCol col='12'>
            <MDBCard className='bg-dark text-white my-5 mx-auto' style={{ borderRadius: '1rem', maxWidth: '400px' }}>
              <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>
                <form onSubmit={handleLogin}>
                  <MDBInput
                    wrapperClass='mb-4 mx-5 w-100'
                    labelClass='text-white'
                    size="lg"
                    className="txtf"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                  <MDBInput
                    wrapperClass='mb-4 mx-5 w-100'
                    labelClass='text-white'
                    id="password"
                    className="txtf"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    size="lg"
                  />
                  <MDBBtn className="btn btn-primary btn-lg w-100 mb-4" color='white' type="submit">
                    Sign in
                  </MDBBtn>
                
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default UserRecipes;

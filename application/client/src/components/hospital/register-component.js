import React , {useState} from 'react';
import {
  MDBInput,
  MDBCol,
  MDBRow,
  MDBCheckbox,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';
import AuthService from '../services/auth-service';
import { useNavigate } from 'react-router-dom';

export default function RegisterComponent() {
    let [userID , setUserID] = useState();
    let [checkpassword , setCheckPassword] = useState();
    let [password , setPassword] = useState();
    let [message , setMessage] = useState();
    const navigate = useNavigate();
    const handleChangeUserID = (e) => {
        
        setUserID(e.target.value);
    }

    

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeCheckPassword = (e) => {
        setCheckPassword(e.target.value);
       
        
    }

    const handleRegister = () => {
        console.log("handle register... sending to auth service.");
        console.log(userID);
        if(password !== checkpassword) {
            setMessage("確認密碼錯誤");
            return false;
        } else {
            setMessage("");
        }
        AuthService.register(userID , password ).then(() => {
            console.log("送出請求");
            window.alert(
                "Registration success! redirect to the login page!"
            );
            navigate("/login");
        }).catch(error => {
            console.log("sending to Auth service catch error...");
            console.log(error.response);
            setMessage(error.response.data);
        });
    }

  return (
    <div className='d-flex justify-content-center' style={{ height: '100vh' }}>
        <form className='m-5'>
            <h1 className='mb-4'>註冊</h1>
            { message && <div className="alert alert-danger">{message}</div> }
            <MDBRow className='mb-4'>

                <MDBCol>
                    <MDBInput onChange={handleChangeUserID} id='form3Example1' label='User ID' />
                </MDBCol>
                
                
            </MDBRow>
            
            <MDBInput onChange={handleChangePassword} className='mb-4' type='password' id='pwInput' label='Password' />
            <MDBInput onChange={handleChangeCheckPassword} className='mb-4' type='password' id='checkPwInput' label='Check Password' />
            
            

            <MDBBtn onClick={handleRegister} type='button' className='mb-4' block>
                SIGN UP
            </MDBBtn>

            <div className='text-center'>
                <p>or sign up with:</p>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='facebook-f' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='google' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='twitter' />
                </MDBBtn>

                <MDBBtn floating className='mx-1'>
                    <MDBIcon fab icon='github' />
                </MDBBtn>
            </div>
        </form>
    </div>
    
  );
}
import React , {useState} from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn
} from 'mdb-react-ui-kit';
import InfoService from '../../service/info-service';
import NavComponent from './nav-component';
import AuthService from '../../service/auth-service';

export default function AddInfoComponent() {

    let [currentUser , setCurrentUser] = useState(AuthService.getCurrentUser());
    let [name , setName] = useState('');
    let [ligation , setLigation] = useState(false);
    let [species , setSpecies] = useState('');
    let [breed , setBreed] = useState('');
    let [owner , setOwner] = useState('');
    let [ownerID , setOwnerID] = useState('');
    let [phone , setPhone] = useState('');
    let [chipID , setChipID] = useState('');
    let [birthday , setBirthday] = useState('');
    let [gender , setGender] = useState('');
    let [bloodType , setBloodType] = useState('');
    let [allergy , setAllergy] = useState('');
    let [majorDiseases , setMajorDiseases] = useState('');
    let [remark , setRemark] = useState('');
    let [hospital , setHospital] = useState('');
    const inputName = (e:any) => {
        setName(e.target.value);
    }
    const ligationCheck = () => {
        setLigation(!ligation);
    }
    const inputSpecies = (e:any) => {
        setSpecies(e.target.value);
    }
    const inputBreed = (e:any) => {
        setBreed(e.target.value);
    }
    const inputOwner = (e:any) => {
        setOwner(e.target.value);
    }
    const inputPhone = (e:any) => {
        setPhone(e.target.value);
    }
    const inputChip = (e:any) => {
        setChipID(e.target.value);
    }
    const inputBirthday = (e:any) => {
        setBirthday(e.target.value);
    }
    const inputGender = (e:any) => {
        setGender(e.target.value);
    }
    const inputBloodType = (e:any) => {
        setBloodType(e.target.value);
    }
    const inputAllergy = (e:any) => {
        setAllergy(e.target.value);
    }
    const inputMajorDiseases = (e:any) => {
        setMajorDiseases(e.target.value);
    }
    
    const inputRemark = (e:any) => {
        setRemark(e.target.value);
    }

    const postInfo = () => {
        console.log("ready pose..");
        console.log(name, species, breed , owner ,ownerID, phone , chipID , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital);
        InfoService.create(name, species, breed , owner ,ownerID, phone , chipID , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital)
          .then(() => {
            window.alert("New Pet-Info has been created.");
          })
          .catch((error) => {
            console.log("create new info catching Error!");
            console.log(error.response);
            
          });
    };
    
  return (
    <div>
        <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
        <div className='d-flex'  style={{ height: '100vh' }}>
        <div className='col-2'></div>
        <form className='mt-5 col-6 m-5'>
            <h3 className='mb-4'>????????????</h3>
            <MDBRow className='mb-4'>
                <MDBCol>
                    <MDBInput name='name' onChange={inputName} label='????????????' />
                </MDBCol>
                
                <MDBCol>
                    <MDBCheckbox checked={ligation} onChange={ligationCheck} name='ligation' label='??????' />
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <MDBInput wrapperClass='mb-4' onChange={inputSpecies}  name='species' label='??????' />
                </MDBCol>
                <MDBCol>
                    <MDBInput wrapperClass='mb-4' onChange={inputBreed}  name='breed' label='??????' />
                </MDBCol>
            </MDBRow>
            <MDBRow>
                <MDBCol>
                    <MDBInput wrapperClass='mb-4' name='owner' onChange={inputOwner}  label='??????' />
                </MDBCol>
                <MDBCol>
                    <MDBInput wrapperClass='mb-4' name='phone' type='tel' onChange={inputPhone}  label='??????' />
                </MDBCol>
            </MDBRow>
            <MDBInput wrapperClass='mb-4'  label='?????????' />
            <MDBInput wrapperClass='mb-4' name='chip' onChange={inputChip}  label='?????????  ' />
            <MDBRow className='mb-4'>
                <MDBCol>
                    <MDBInput name='birthday' onChange={inputBirthday}  label='??????' />
                </MDBCol>
                <MDBCol>
                    <MDBInput label='??????' />
                </MDBCol>
            </MDBRow>
            <MDBRow className='mb-4'>
                <MDBCol>
                    <MDBInput name='gender' onChange={inputGender}  label='??????' />
                </MDBCol>
                <MDBCol>
                    <MDBInput name='bloodType' onChange={inputBloodType}  label='??????' />
                </MDBCol>
            </MDBRow>
            
            <MDBInput wrapperClass='mb-4'  name='allergy' onChange={inputAllergy}  label='??????' />
            <MDBInput wrapperClass='mb-4'  name='majorDiseases' onChange={inputMajorDiseases}  label='????????????' />
            <MDBInput wrapperClass='mb-4'  name='remark' onChange={inputRemark}  label='??????' />
            <MDBBtn className='mb-4 mt-2' onClick={postInfo} type='button' href='/info' block>
                ??????
            </MDBBtn>
        </form>
    </div>

    </div>
    
  );
}
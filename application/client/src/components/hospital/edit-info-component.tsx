import React , {useState , useEffect} from 'react';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBInputGroup,
  MDBTable,
  MDBTableBody
} from 'mdb-react-ui-kit';
import InfoService from '../../service/info-service';

export default function EditInfoComponent(props:any) {
    let {infoData , setInfoData} = props;
    let {search , setSearch} = props;
    let [name , setName] = useState(infoData.info.name);
    let [ligation , setLigation] = useState(false);
    let [species , setSpecies] = useState(infoData.info.species);
    let [breed , setBreed] = useState(infoData.info.breed);
    let [owner , setOwner] = useState(infoData.info.owner);
    let [ownerID , setOwnerID] = useState(infoData.info.ownerID);
    let [phone , setPhone] = useState(infoData.info.phone);
    let [chipID , setChipID] = useState(infoData.info.chipID);
    let [birthday , setBirthday] = useState(infoData.info.birthday);
    let [gender , setGender] = useState(infoData.info.gender);
    let [bloodType , setBloodType] = useState(infoData.info.bloodType);
    let [allergy , setAllergy] = useState(infoData.info.allergy);
    let [majorDiseases , setMajorDiseases] = useState(infoData.info.majorDiseases);
    let [remark , setRemark] = useState(infoData.info.remark);
    let [hospital , setHospital] = useState(infoData.info.hospital);
    
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

    

    const handleDeleteInfo = () => {
        try{
          InfoService.delete(search);
        } catch(error) {
          console.log("??????????????????????????????");
          console.log(error);
        }
        
    }
    // useEffect(() => {
    //     console.log("using effect");
    //     console.log(search);
    //     infoService.get(search).then((data) => {
    //         console.log(data);
    //         setInfoData(data.data);
    //     }).catch((error) => {
    //         console.log(error);
    //         console.log(search);
    //     });
    // } , []);

    const editInfo = () => {
        console.log("Edited! sending patch request...");
        console.log(search , name, species, breed , owner , phone , chipID , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark);
        InfoService.patch( search , name, species, breed , owner ,ownerID, phone  , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital )
          .then(() => {
            window.alert("This Info has been edited.");
            
          })
          .catch((error) => {
            console.log("Edit info catching Error!");
            console.log(error.response);
          });
    };
    
  return (
    <div className='col-9 m-5'>
       
       {infoData != null && (
          <MDBTable striped className='table-dark rounded-5 square ' >
            <MDBTableBody>
              <tr>
                <td colSpan={3} className='fs-3' ><b>RECORD</b></td>
                <td align='right'><MDBBtn color='success' onClick={editInfo} href='/info'>??????</MDBBtn> <MDBBtn color='danger' className='ms-2' onClick={handleDeleteInfo} href='/info'>Delete</MDBBtn></td>
              </tr>
              <tr>         
                <td ><b>?????????</b></td>
                <td ><input type="text" value={name} onChange={inputName} /></td>
                <td ><b>??????</b></td>
                <td ><input type="text" value={owner} onChange={inputOwner} /></td>
              </tr>
              <tr>
                <td >??????</td>
                <td ><input type="text" value={species} onChange={inputSpecies} /></td>
                <td >??????</td>
                <td ><input type="text" value={breed} onChange={inputBreed} /></td>
              </tr>
              <tr>
                <td >??????</td>
                <td ><input type="text" value={phone} onChange={inputPhone} /></td>
                <td >?????????</td>
                <td >{infoData.info._id}</td>
              </tr>
              <tr>
                <td >?????????</td>
                <td ><input type="text" value={chipID} onChange={inputChip} /></td>
                <td >??????</td>
                <td ><input type="text" value={birthday} onChange={inputBirthday} /></td>
              </tr>
              <tr>
                <td >??????</td>
                <td ></td>
                <td >??????</td>
                <td ><input type="text" value={gender} onChange={inputGender} /></td>
              </tr>
              <tr>
                <td >??????</td>
                <td ><input type="text" value={bloodType} onChange={inputBloodType} /></td>
                <td >??????</td>
                <td><MDBCheckbox checked={ligation} onChange={ligationCheck} name='ligation' label='??????' /></td>
                
              </tr>
              <tr>
                <td >??????</td>
                <td ><input type="text" value={allergy} onChange={inputAllergy} /></td>
                <td >????????????</td>
                <td ><input type="text" value={majorDiseases} onChange={inputMajorDiseases} /></td>
              </tr>
              <tr className='table-warning '>
                <td>??????</td>
                <td colSpan={3}><input type="text" value={remark} onChange={inputRemark} /></td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        )}
    </div>
  );
}
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
import infoService from '../../service/info-service';

export default function EditInfoComponent(props) {
    let {infoData , setInfoData} = props;
    let {search , setSearch} = props;
    let [name , setName] = useState(infoData.info.name);
    let [ligation , setLigation] = useState(false);
    let [species , setSpecies] = useState(infoData.info.species);
    let [breed , setBreed] = useState(infoData.info.breed);
    let [owner , setOwner] = useState(infoData.info.owner);
    let [phone , setPhone] = useState(infoData.info.phone);
    let [chip , setChip] = useState(infoData.info.chip);
    let [birthday , setBirthday] = useState(infoData.info.birthday);
    let [gender , setGender] = useState(infoData.info.gender);
    let [bloodType , setBloodType] = useState(infoData.info.bloodType);
    let [allergy , setAllergy] = useState(infoData.info.allergy);
    let [majorDiseases , setMajorDiseases] = useState(infoData.info.majorDiseases);
    let [remark , setRemark] = useState(infoData.info.remark);
    
    const inputName = (e) => {
        setName(e.target.value);
    }
    const ligationCheck = () => {
        setLigation(!ligation);
    }
    const inputSpecies = (e) => {
        setSpecies(e.target.value);
    }
    const inputBreed = (e) => {
        setBreed(e.target.value);
    }
    const inputOwner = (e) => {
        setOwner(e.target.value);
    }
    const inputPhone = (e) => {
        setPhone(e.target.value);
    }
    const inputChip = (e) => {
        setChip(e.target.value);
    }
    const inputBirthday = (e) => {
        setBirthday(e.target.value);
    }
    const inputGender = (e) => {
        setGender(e.target.value);
    }
    const inputBloodType = (e) => {
        setBloodType(e.target.value);
    }
    const inputAllergy = (e) => {
        setAllergy(e.target.value);
    }
    const inputMajorDiseases = (e) => {
        setMajorDiseases(e.target.value);
    }
    
    const inputRemark = (e) => {
        setRemark(e.target.value);
    }

    

    const handleDeleteInfo = () => {
        try{
          infoService.delete(search);
        } catch(error) {
          console.log("發送刪除病歷請求錯誤");
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
        console.log(search , name, species, breed , owner , phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark);
        infoService.patch( search , name, species, breed , owner , phone , chip , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark)
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
                <td align='right'><MDBBtn color='success' onClick={editInfo} href='/info'>完成</MDBBtn> <MDBBtn color='danger' className='ms-2' onClick={handleDeleteInfo} href='/info'>Delete</MDBBtn></td>
              </tr>
              <tr>         
                <td ><b>寵物名</b></td>
                <td ><input type="text" value={name} onChange={inputName} /></td>
                <td ><b>飼主</b></td>
                <td ><input type="text" value={owner} onChange={inputOwner} /></td>
              </tr>
              <tr>
                <td >種類</td>
                <td ><input type="text" value={species} onChange={inputSpecies} /></td>
                <td >品種</td>
                <td ><input type="text" value={breed} onChange={inputBreed} /></td>
              </tr>
              <tr>
                <td >電話</td>
                <td ><input type="text" value={phone} onChange={inputPhone} /></td>
                <td >病歷號</td>
                <td >{infoData.info._id}</td>
              </tr>
              <tr>
                <td >晶片號</td>
                <td ><input type="text" value={chip} onChange={inputChip} /></td>
                <td >生日</td>
                <td ><input type="text" value={birthday} onChange={inputBirthday} /></td>
              </tr>
              <tr>
                <td >年齡</td>
                <td ></td>
                <td >性別</td>
                <td ><input type="text" value={gender} onChange={inputGender} /></td>
              </tr>
              <tr>
                <td >血型</td>
                <td ><input type="text" value={bloodType} onChange={inputBloodType} /></td>
                <td >結紮</td>
                <td><MDBCheckbox checked={ligation} onChange={ligationCheck} name='ligation' label='結紮' /></td>
                
              </tr>
              <tr>
                <td >過敏</td>
                <td ><input type="text" value={allergy} onChange={inputAllergy} /></td>
                <td >重大疾病</td>
                <td ><input type="text" value={majorDiseases} onChange={inputMajorDiseases} /></td>
              </tr>
              <tr className='table-warning '>
                <td>備註</td>
                <td colSpan={3}><input type="text" value={remark} onChange={inputRemark} /></td>
              </tr>
            </MDBTableBody>
          </MDBTable>
        )}
    </div>
  );
}
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
    let [name , setName] = useState(infoData.name);
    let [ligation , setLigation] = useState(false);
    let [species , setSpecies] = useState(infoData.species);
    let [breed , setBreed] = useState(infoData.breed);
    let [owner , setOwner] = useState(infoData.owner);
    let [ownerID , setOwnerID] = useState(infoData.ownerID);
    let [phone , setPhone] = useState(infoData.phone);
    let [chipID , setChipID] = useState(infoData.chipID);
    let [birthday , setBirthday] = useState(infoData.birthday);
    let [gender , setGender] = useState(infoData.gender);
    let [bloodType , setBloodType] = useState(infoData.bloodType);
    let [allergy , setAllergy] = useState(infoData.allergy);
    let [majorDiseases , setMajorDiseases] = useState(infoData.majorDiseases);
    let [remark , setRemark] = useState(infoData.remark);
    let [hospital , setHospital] = useState(infoData.hospital);
    
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
    const inputChipID = (e:any) => {
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
        console.log(search , name, species, breed , owner , phone , chipID , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark);
        InfoService.patch( chipID , name, species, breed , owner ,ownerID, phone  , birthday , gender , bloodType , ligation , allergy , majorDiseases , remark , hospital )
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
                <td align='right'><MDBBtn color='success' onClick={editInfo} href='/hospitalhome'>完成</MDBBtn> <MDBBtn color='danger' className='ms-2' onClick={handleDeleteInfo} href='/hospitalhome'>Delete</MDBBtn></td>
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
                <td ></td>
              </tr>
              <tr>
                <td >晶片號</td>
                <td ></td>
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
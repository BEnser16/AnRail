import React , {useState} from 'react'
import { MDBTable, MDBTableHead, MDBTableBody , MDBInputGroup,MDBBtn} from 'mdb-react-ui-kit';
import InfoService from '../../service/info-service';
import EditInfoComponent from './edit-info-component';
import ListComponent from './list-component';
import NavComponent from './nav-component';
import AuthService from '../../service/auth-service';


const InfoComponent = () => {
  let [infoData , setInfoData] = useState({
    resultjson: {
      name:'',
      owner:'',
      species:'',
      breed:'',
      phone:'',
      chipID:'',
      birthday:'',
      gender:'',
      bloodType:'',
      ligation:false,
      allergy:'',
      majorDiseases:'',
      remark:'',

    }
  });
  let [search , setSearch] = useState("");
  let [editTime , setEditTime] = useState(false);
  let [currentUser , setCurrentUser] = useState(AuthService.getCurrentUser());

  const inputSearch = (e:any) => {
    setSearch(e.target.value);
  }
  const handleSearchInfo = () => {
    console.log(editTime);
    InfoService.get(search).then((data) => {
      let jsonData = JSON.stringify(data.data)
      console.log(jsonData);
      console.log(data.data);
      setInfoData(data.data);
    }).catch((error) => {
      console.log(error);
    })
  }
  const handleDeleteInfo = () => {
    try{
      InfoService.delete(search);
    } catch(error) {
      console.log("發送刪除病歷請求錯誤");
      console.log(error);
    }
  }

  const handleEdit = () => {
    setEditTime(!editTime);
    console.log(editTime);
  }

  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className='col-9 m-5'>
      
      <h4 className='mb-3 ms-1'>病歷查詢</h4>
      <MDBInputGroup className='mb-5'>
        <input className='form-control' placeholder="Search Pet-ID" type='text' onChange={inputSearch} />
        <MDBBtn onClick={handleSearchInfo}>Search</MDBBtn>
      </MDBInputGroup> 
       {editTime && (
          
         <EditInfoComponent search={search} setSearch={setSearch}  infoData={infoData} setInfoData={setInfoData} />
        )}
           
        {infoData !== null && !editTime && (  
            <MDBTable striped className='table-dark rounded-5 square ' >
              <MDBTableBody>
                <tr>
                  <td colSpan={3} className='fs-3' ><b>RECORD</b></td>
                  <td align='right'><MDBBtn color='success' onClick={handleEdit} >EDIT</MDBBtn> <MDBBtn color='danger' className='ms-2' onClick={handleDeleteInfo} href='/info'>Delete</MDBBtn></td>
                </tr>
                <tr>         
                  <td ><b>寵物名</b></td>
                  <td >{infoData.resultjson.name}</td>
                  <td ><b>飼主</b></td>
                  <td >{}</td>
                </tr>
                <tr>
                  <td  >種類</td>
                  <td >{}</td>
                  <td >品種</td>
                  <td >{}</td>
                </tr>
                <tr>
                  <td >電話</td>
                  <td >{}</td>
                  <td >病歷號</td>
                  <td >{}</td>
                </tr>
                <tr>
                  <td >晶片號</td>
                  <td >{}</td>
                  <td >生日</td>
                  <td >{}</td>
                </tr>
                <tr>
                  <td >年齡</td>
                  <td ></td>
                  <td >性別</td>
                  <td >{}</td>
                </tr>
                <tr>
                  <td >血型</td>
                  <td >{}</td>
                  <td >結紮</td>
                  {true == true && (
                    <td>已結紮</td>
                  )}
                  {true != true && (
                    <td>未結紮</td>
                  )}                 
                </tr>
                <tr>
                  <td >過敏</td>
                  <td >{}</td>
                  <td >重大疾病</td>
                  <td >{}</td>
                </tr>
                <tr className='table-warning '>
                  <td>備註</td>
                  <td colSpan={3}>{}</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          )}
          {infoData === null && !editTime && (
            <ListComponent infoData={infoData} setInfoData={setInfoData} />
          )} 
          {/* <ListComponent infoData={infoData} setInfoData={setInfoData} /> */}
    </div>

    </div>
    
  )
}

export default InfoComponent

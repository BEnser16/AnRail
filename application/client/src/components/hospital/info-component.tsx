import React, { useState } from "react";
import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBInputGroup,
  MDBBtn,
} from "mdb-react-ui-kit";
import InfoService from "../../service/info-service";
import EditInfoComponent from "./edit-info-component";
import ListComponent from "./list-component";
import NavComponent from "./nav-component";
import AuthService from "../../service/auth-service";
import BasicTabs from "./tabs";

const InfoComponent = () => {
  let [infoData, setInfoData] = useState<{
    name: string;
    species: string;
    breed: string;
    owner: string;
    ownerID: string;
    phone: string;
    chipID: string;
    birthday: string;
    gender: string;
    bloodType: string;
    ligation: boolean;
    allergy: string;
    majorDiseases: string;
    remark: string;
    hospital: string;
  } | null>(null);

  let [search, setSearch] = useState("");
  let [editTime, setEditTime] = useState(false);
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [tabvale , setTabvalue] = useState(0);

  const inputSearch = (e: any) => {
    setSearch(e.target.value);
  };
  const handleSearchInfo = () => {
    console.log(editTime);
    InfoService.get(search)
      .then((data) => {
        console.log("getpet 返回值：" + data);
        //  把json字符串 轉為object
        const searchinfo_json_object = JSON.parse(data.data.resultjson);
        console.log("test pet name" + searchinfo_json_object.name);

        setInfoData(searchinfo_json_object);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteInfo = () => {
    try {
      InfoService.delete(search);
    } catch (error) {
      console.log("發送刪除病歷請求錯誤");
      console.log(error);
    }
  };

  const handleEdit = () => {
    setEditTime(!editTime);
    console.log(editTime);
  };

  return (
    <div>
      <NavComponent currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className="col-9 m-5">
        <h4 className="mb-3 ms-1">病歷查詢</h4>
        <MDBInputGroup className="mb-5">
          <input
            className="form-control"
            placeholder="Search Pet-ID"
            type="text"
            onChange={inputSearch}
          />
          <MDBBtn onClick={handleSearchInfo}>Search</MDBBtn>
        </MDBInputGroup>

        {editTime && (
          <EditInfoComponent
            search={search}
            setSearch={setSearch}
            infoData={infoData}
            setInfoData={setInfoData}
          />
        )}
        {infoData !== null && !editTime && (
          <BasicTabs tabvalue={tabvale} setTabvalue={setTabvalue} infoData={infoData} setInfoData={setInfoData} />
        )}
        {infoData !== null && tabvale == 0 && !editTime && (
          <div>
            
            <MDBTable striped className="table-dark rounded-5 square ">
              <MDBTableBody>
                <tr>
                  <td colSpan={3} className="fs-3">
                    <b>RECORD</b>
                  </td>
                  <td align="right">
                    <MDBBtn color="success" onClick={handleEdit}>
                      EDIT
                    </MDBBtn>{" "}
                    <MDBBtn
                      color="danger"
                      className="ms-2"
                      onClick={handleDeleteInfo}
                      href="/info"
                    >
                      Delete
                    </MDBBtn>
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>寵物名</b>
                  </td>
                  <td>{infoData.name}</td>
                  <td>
                    <b>飼主</b>
                  </td>
                  <td>{infoData.owner}</td>
                </tr>
                <tr>
                  <td>種類</td>
                  <td>{infoData.breed}</td>
                  <td>品種</td>
                  <td>{infoData.species}</td>
                </tr>
                <tr>
                  <td>電話</td>
                  <td>{infoData.phone}</td>
                  <td>病歷號</td>
                  <td>{}</td>
                </tr>
                <tr>
                  <td>晶片號</td>
                  <td>{infoData.chipID}</td>
                  <td>生日</td>
                  <td>{infoData.birthday}</td>
                </tr>
                <tr>
                  <td>年齡</td>
                  <td></td>
                  <td>性別</td>
                  <td>{infoData.gender}</td>
                </tr>
                <tr>
                  <td>血型</td>
                  <td>{infoData.bloodType}</td>
                  <td>結紮</td>
                  {true == true && <td>已結紮</td>}
                  {true != true && <td>未結紮</td>}
                </tr>
                <tr>
                  <td>過敏</td>
                  <td>{infoData.allergy}</td>
                  <td>重大疾病</td>
                  <td>{infoData.majorDiseases}</td>
                </tr>
                <tr className="table-warning ">
                  <td>備註</td>
                  <td colSpan={3}>{infoData.remark}</td>
                </tr>
              </MDBTableBody>
            </MDBTable>
          </div>
        )}
        {infoData === null && !editTime && (
          <ListComponent infoData={infoData} setInfoData={setInfoData} />
        )}
        {/* <ListComponent infoData={infoData} setInfoData={setInfoData} /> */}
      </div>
    </div>
  );
};

export default InfoComponent;

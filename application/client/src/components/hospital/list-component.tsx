import React , {useEffect , useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBRipple,
  MDBContainer
} from 'mdb-react-ui-kit';
import infoService from '../../service/info-service';


export default function ListComponent(props:any) {
    let [AllInfoData , setAllInfoData] = useState({
        name:'',
        owner:'',
        remark:'',
        chipID:''
    });
    let {infoData , setInfoData} = props;
    let navigate = useNavigate();
    
    useEffect(() => {
        setInfoData(null);
        infoService.getAllpets().then((data) => {
            
            let objpet = JSON.parse(data.data.resultjson);
            // console.log('物件');
            // console.log(objpet);
            setAllInfoData(objpet[0].Record);
        }).catch((error) => {
            console.log(error);
        });
    } , []);
    
    function checkInfo(chipID:string) {
        infoService.get(chipID).then((check_data) => {
            console.log(check_data.data);
            // 有斜線的json資料 轉為json object 再存入
            let basicDataObj = JSON.parse(check_data.data.resultjson);
            setInfoData(basicDataObj);
          }).catch((error) => {
            console.log(error);
        })
    }

  return (
    <div className='col-6'>
        {AllInfoData != null && (
            <section className='d-flex justify-content-center w-50'>
                {
                    //AllInfoData.map((one_data:any) => (
                        <MDBCard className='ms-2 me-2'>
                            <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>
                                
                                <MDBCardImage src="https://i.epochtimes.com/assets/uploads/2018/05/dog-3313578-450x300.jpg" fluid alt='...' />
                                <a>
                                <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                </a>
                            </MDBRipple>
                            <MDBCardBody>
                                <MDBCardTitle>{AllInfoData.name}</MDBCardTitle>
                                <MDBCardText>
                                    晶片號:{AllInfoData.chipID} <br />
                                    飼主:{AllInfoData.owner}
                                </MDBCardText>
                                   
                                <MDBBtn onClick={() => checkInfo(AllInfoData.chipID)}>查看</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    //))
                }
            </section>
            
        )}
    </div>
   
    
  );
}
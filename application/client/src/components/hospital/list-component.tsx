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
        medicalNumber:'',
        owner:'',
        remark:'',
        petid:''
    });
    let {infoData , setInfoData} = props;
    let navigate = useNavigate();
    
    useEffect(() => {
        setInfoData(null);
        infoService.getAllpets().then((data) => {
            console.log(data);
            console.log("字串裡")
            console.log(data.data.resultjson);
            let objpet = JSON.parse(data.data.resultjson);
            console.log('物件');
            console.log(objpet);
            setAllInfoData(objpet[0].Record);
        }).catch((error) => {
            console.log(error);
        });
    } , []);
    
    function checkInfo(petid:string) {
        infoService.get(petid).then((check_data) => {
            console.log(check_data);
            setInfoData(check_data.data);
          }).catch((error) => {
            console.log(error);
        })
    }

  return (
    <div className='col-6'>
        {AllInfoData != null && (
            <section className='d-flex justify-content-center w-50'>
                {
                    // AllInfoData.map((one_data) => (
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
                                    病歷號:{AllInfoData.medicalNumber}
                                    <br />
                                    飼主:{AllInfoData.owner}
                                </MDBCardText>
                                <MDBCardText>
                                    {AllInfoData.remark}
                                </MDBCardText>
                                <MDBBtn onClick={() => checkInfo(AllInfoData.petid)}>查看</MDBBtn>
                            </MDBCardBody>
                        </MDBCard>
                    // ))
                }
            </section>
            
        )}
    </div>
   
    
  );
}
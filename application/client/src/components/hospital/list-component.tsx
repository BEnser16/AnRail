import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardImage,
    MDBBtn,
    MDBRipple,
    MDBContainer,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';
import infoService from '../../service/info-service';
import { IPet } from '../../interface/IPet';


export default function ListComponent(props: any) {
    let [AllInfoData, setAllInfoData] = useState<IPet[]>([]);
    let { infoData, setInfoData } = props;
    let navigate = useNavigate();

    useEffect(() => {
        setInfoData(null);
        infoService.getAllpets().then((data) => {

            let objpet = JSON.parse(data.data.resultjson);
            console.log('物件');
            console.log(objpet);
            setAllInfoData(objpet);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    function checkInfo(chipID: string) {
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
        <div className='row-3'>
            
            {AllInfoData != null && (

            <section className='d-flex justify-content-center w-100 h-50'>
                    {
                        AllInfoData.map((value: any, index: any) => (
                            
                            <MDBCard className='m-2 w-50' style={{maxHeight:380}} key={index} >
                                <MDBRipple rippleColor='light' rippleTag='div' className='bg-image hover-overlay'>

                                    <MDBCardImage src={`https://drive.google.com/uc?export=view&id=${value.Record.imgID}`} fluid alt='...' />
                                    <a>
                                        <div className='mask' style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }}></div>
                                    </a>
                                </MDBRipple>
                                <MDBCardBody>
                                    <MDBCardTitle>{value.Record.name}</MDBCardTitle>
                                    <MDBCardText>
                                        晶片號:{value.Record.chipID} <br />
                                        飼主:{value.Record.owner}
                                    </MDBCardText>

                                    <MDBBtn onClick={() => checkInfo(value.Record.chipID)}>查看</MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                            

                        ))
                    }

                </section>




            )}
            
        </div>

    );
}
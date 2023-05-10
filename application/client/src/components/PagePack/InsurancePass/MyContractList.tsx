import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import authService from '../../../service/auth-service';
import breederService from '../../../service/breeder-service';
import { IInsuranceContract } from '../../../interface/IInsuranceContract';

import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function MyContractList() {
    let [contractList, setContractList] = React.useState<IInsuranceContract[] | any>([]);
    let [show, setShow] = React.useState(false);
    let [midtitle, setMidtitle] = React.useState("");
    const handleCheckContract = () => {

        setShow(!show);

    }

    React.useEffect(() => {
        console.log(contractList.length);
        let userobj = JSON.parse(authService.getCurrentUser().logindata);
        breederService.getMyInsuranceContract(userobj.userID).then((res) => {

            console.log(res.data);
            if(res.data.length == 0) {
                setMidtitle("目前無保單");
            } else {
                setContractList(res.data);
            }
            
        });

    }, []);


    return (
        <Box>
            <Typography variant="h5" style={{ color: 'inherit' }} sx={{ my: 5, fontWeight: "bold" }}>您的保單</Typography>
            <Typography variant="h5" style={{ color: 'inherit' }} sx={{ my: 5, fontWeight: "bold" }}>{midtitle}</Typography>


            {!show && contractList.map((element: any, index: any) => (
                <div key={index}>

                    <Card sx={{ maxWidth: "50%" , borderRadius:3 , border:1}} key={index} >
                        <CardActionArea >
                            <CardMedia
                                component="img"
                                height="140"
                                
                                src="https://images.unsplash.com/photo-1517451330947-7809dead78d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                                alt="green iguana"
                            />
                            <CardContent sx={{ minWidth: "45%" }}>
                                <Typography gutterBottom variant="h5" >
                                    保險方案:米有保
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    寵物名稱:{element.Record.PetName}
                                </Typography>
                                <Typography gutterBottom variant="h6" sx={{my:1}}>
                                    被保險人資料
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    姓名:{element.Record.ProposerName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    身分證字號:{element.Record.ProposerID}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    電子郵件:{element.Record.ProposerName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    電話號碼:{element.Record.ProposerID}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    期數:第 {element.Record.Phrase} 期
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        
                    </Card>
                </div>
            ))}

        </Box>

    );
}
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IPet} from '../interface/IPet';
import PetBasicData from './petBasicData-component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';

export default function InsurCalculate(props:{} | any) {
    let {allinsurData , setallinsurData} = props;
    let [show , setShow] = React.useState(false);
    

    // const handleCalculatePremium = () => {
    //   //  計算年齡
    //   function getAge(PetBornDate:Date , yearNorMonth:boolean): number {
    //       const today = new Date();
    //       let years = today.getFullYear() - PetBornDate.getFullYear();
    //       let months = today.getMonth() - PetBornDate.getMonth();

    //       // 如果月份差值為負數，表示今年還沒到生日，年齡要扣 1 歲，並加上 12 個月
    //       if (months < 0) {
    //           years--;
    //           months += 12;
    //       }

    //       if(yearNorMonth) {
    //           return years;
    //       } else {
    //           return months;
    //       }
    //   }

    //   let ageYear = this.getAge(this.PetBornDate , true);
    //   let ageMonth = this.getAge(this.PetBornDate , false);
    //   if(ageYear <= 8 && ageMonth < 6) {
    //       if(this.DogNorCat) {
    //           return 1508;
    //       } else {
    //           return 1200;
    //       }
    //   } else if(ageYear <= 10 && ageMonth < 6) {
    //       if(this.DogNorCat) {
    //           return 3329
    //       } else {
    //           return 2644;
    //       }
    //   } else if(ageYear <= 15 && ageMonth < 6 && this.Phrase != 1) {
    //       if(this.DogNorCat)  {
    //           return 4965;
    //       } else {
    //           return 3940;
    //       }

    //   } else {
    //       return 0;
    //   }
      
      
    // }



  return (
    <Box sx={{mt:2}}>
       <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:"bold"}}>
            符合投保資格的寵物:
       </Typography>
       <br />
      {[allinsurData.petdata].map(( one , key) => (

      
        <Card sx={{ maxWidth: 400 , maxHeight:380 , borderRadius:"12px" }} raised={true} >
            <CardMedia
            component="img"
            height="200"
            src="https://i.epochtimes.com/assets/uploads/2018/05/dog-3313578-450x300.jpg" 
            alt="green iguana"
            />
            <CardContent>
            <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:"bold"}}>
                {one[key].Record.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                飼主：{one[key].Record.owner} < br />
                品種：{one[key].Record.breed} < br />
                晶片碼：{one[key].Record.chipID} 
            </Typography>
            </CardContent>
            <CardActions>
            {/* <Button onClick={handleCalculatePremium} variant='contained' size="small">試算保費</Button> */}
            </CardActions>
        
        </Card>
        ))}
      
    </Box>
    
  );
}

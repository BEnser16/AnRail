import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IPet} from '../interface/pet';
import PetBasicData from './petBasicData-component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';

export default function PetCard(props:IPet[] | any) {
    let {mypetdata , setMypetdata} = props;
    let [show , setShow] = React.useState(false);
    

    const handleCheckPetBasic = () => {
      setShow(!show);
      
    }



  return (
    <Box sx={{mt:2}}>
      {!show && <Card sx={{ maxWidth: 400 , maxHeight:380 , borderRadius:"12px" }} raised={true} >
        <CardMedia
          component="img"
          height="200"
          src="https://i.epochtimes.com/assets/uploads/2018/05/dog-3313578-450x300.jpg" 
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{fontWeight:"bold"}}>
            {mypetdata[0].Record.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
              飼主：{mypetdata[0].Record.owner} < br />
              品種：{mypetdata[0].Record.breed} < br />
              晶片碼：{mypetdata[0].Record.chipID} 
          </Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleCheckPetBasic} variant='contained' size="small">查看</Button>
        </CardActions>
      
      </Card>}
      
      {show && 
        <Box>
          <Button onClick={handleCheckPetBasic} size="medium" sx={{mb:2}}><ArrowBackIcon /> 返回</Button>
          <PetBasicData mypetdata={mypetdata} setMypetdata={setMypetdata}   />
        </Box>
      }
    </Box>
    
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IPet} from '../interface/pet';

export default function PetCard(props:IPet[] | any) {
    let {mypetdata , setMypetdata} = props;
    
    



  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardMedia
        component="img"
        height="250"
        src="https://i.epochtimes.com/assets/uploads/2018/05/dog-3313578-450x300.jpg" 
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {mypetdata[0].Record.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
            飼主：{mypetdata[0].Record.owner} < br />
            品種：{mypetdata[0].Record.breed} < br />
            晶片碼：{mypetdata[0].Record.ownerID} 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">分享</Button>
        <Button size="small">查看</Button>
      </CardActions>
    </Card>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import MixInsur from './mixInsur-component';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function InsurCard(props:any) {
    let {allinsurData , setallinsurData} = props;
    let [show , setShow] = React.useState(false);
    const handleCheckMixInsur = () => {
        setShow(!show);
        
    }
  return (
    <Box>
        {!show &&
            <Card sx={{ maxWidth: "1" , display:'flex'}}>
                <CardActionArea sx={{display:'flex'}}>
                    <CardMedia
                    component="img"
                    height="140"
                    sx={{maxWidth:"1"}}
                    src="https://images.unsplash.com/photo-1517451330947-7809dead78d5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    alt="green iguana"
                    />
                    <CardContent sx={{minWidth:"45%"}}>
                    <Typography gutterBottom variant="h5" component="div">
                        米有保
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        針對米克斯毛孩推出的寵物保險
                    </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button onClick={handleCheckMixInsur} size="medium" variant='contained' color="primary" >
                        查看
                    </Button>
                </CardActions>
            </Card>
        }
        
        {show &&
            <Box>
                <Button onClick={handleCheckMixInsur} size="medium" sx={{mb:2}}><ArrowBackIcon /> 返回</Button>
                <MixInsur allinsurData={allinsurData} setallinsurData={setallinsurData} /> 
            </Box>
            
        }

    </Box>
    
  );
}
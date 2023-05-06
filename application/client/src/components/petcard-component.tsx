import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { IPet } from '../interface/IPet';
import PetBasicData from './petBasicData-component';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import { updateCurrentPet } from '../Storage/Redux/currentPetSlice';
import { CardActionArea } from '@mui/material';

export default function PetCard(props: IPet[] | any) {
  let { mypetdata, setMypetdata } = props;
  let [show, setShow] = React.useState(false);
  let [single_pet_data, setSingle_pet_data] = React.useState<IPet>();
  const dispatch = useDispatch();

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mt: 2, display: 'flex' }}>
        {!show && mypetdata.map((value: IPet, index: number) => (

          <Card sx={{ minWidth: 320, maxHeight: 350, borderRadius: "12px", m: 2 }} key={index} raised={true} onClick={() => {
            setSingle_pet_data(value);
            console.log(value);
            setShow(!show);

          }} >
            <CardActionArea>
              <CardMedia
                component="img"
                height="180"
                
                src="https://i.epochtimes.com/assets/uploads/2018/05/dog-3313578-450x300.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                  {value.Record.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  飼主：{value.Record.owner} <br />
                  品種：{value.Record.breed} <br />
                  晶片碼：{value.Record.chipID}
                </Typography>
              </CardContent>
              {/* <CardActions>
              <Button onClick={() => {
                setSingle_pet_data(value);
                console.log(value);
                setShow(!show);

              }} variant='contained' size="small">查看</Button>
              <Button onClick={() => {
                dispatch(updateCurrentPet(value.Record.chipID));
              }} variant='contained' size="small">選擇</Button>
            </CardActions> */}

            </CardActionArea>

          </Card>
        ))}
      </Box>

      {show &&
        <Box>
          <Button onClick={() => { setShow(!show); }} size="medium" sx={{ mb: 2 }}><ArrowBackIcon /> 返回</Button>
          <PetBasicData single_pet_data={single_pet_data} setSingle_pet_data={setSingle_pet_data} />
        </Box>
      }
    </Box>

  );
}

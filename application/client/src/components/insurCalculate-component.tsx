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
import { useGetMyPetDatasByUserIDMutation } from '../Apis/myPetDataApi';
import { useDispatch } from "react-redux";
import { setMyPetData } from '../Storage/Redux/myPetDataSlice';
import AuthService from '../service/auth-service';
import BreederSerivce from '../service/breeder-service';
import PurchaseInsurance from './PagePack/PetInsurance/PurchaseInsurance';

export default function InsurCalculate(props: {} | any) {
  let { allinsurData, setallinsurData } = props;
  let [showmode, setShowmode] = React.useState("");
  let [title, setTitle] = React.useState("");
  let [premium, setPremium] = React.useState(0);
  let [mypetlist, setMypetlist] = React.useState([]);
  const [single_pet_data , setSingle_pet_data] = React.useState<any>();


  const handleMypets = () => {
    const userobj = JSON.parse(AuthService.getCurrentUser().logindata);
    BreederSerivce.getMypets(userobj.userID).then((response) => {
      setMypetlist(response.data.mypetlist);
    });
  }

  // const [result, { data, isLoading }]= useGetMyPetDatasByUserIDMutation(userobj.userID);
  const dispatch = useDispatch();

  React.useEffect(() => {
    setShowmode("choose_pet");
    setTitle("選擇要投保的的寵物");
    handleMypets();

  }, []);




  const handleCalculatePremium = (key: any) => {
    //  計算年齡
    function getAge(PetBornDate: Date, yearNorMonth: boolean): number {
      const today = new Date();
      let years = today.getFullYear() - PetBornDate.getFullYear();
      let months = today.getMonth() - PetBornDate.getMonth();

      // 如果月份差值為負數，表示今年還沒到生日，年齡要扣 1 歲，並加上 12 個月
      if (months < 0) {
        years--;
        months += 12;
      }

      if (yearNorMonth) {
        return years;
      } else {
        return months;
      }
    }

    let thisPetBornDate: Date = new Date(allinsurData.petdata[key].Record.birthday)
    let ageYear = getAge(thisPetBornDate, true);
    let ageMonth = getAge(thisPetBornDate, false);

    if (ageYear <= 8 && ageMonth < 6) {
      if (allinsurData.insurData[key].Record.DogNorCat) {
        setPremium(1508);
      } else {
        setPremium(1200);
      }
    } else if (ageYear <= 10 && ageMonth < 6) {
      if (allinsurData.insurData[key].Record.DogNorCat) {
        setPremium(3329);
      } else {
        setPremium(2644);
      }
    } else if (ageYear <= 15 && ageMonth < 6 && allinsurData.insurData[key].Record.Phrase != 1) {
      if (allinsurData.insurData[key].Record.DogNorCat) {
        setPremium(4965);
      } else {
        setPremium(3940);
      }

    } else {
      setPremium(0);
    }

    console.log(thisPetBornDate);

  }





  return (
    <Box sx={{ mt: 2 }}>
      <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
        {title}
      </Typography>
      <br />
      {showmode === "purchase_insurance" ?
        <PurchaseInsurance single_pet_data={single_pet_data} setSingle_pet_data={setSingle_pet_data}/> : null
      }
      {showmode === "choose_pet" ?
        <Box sx={{ display: 'flex' }}>
          {mypetlist.map((petdata: IPet, index: number) => (


            <Card sx={{ maxWidth: 350, maxHeight: 380, borderRadius: "12px", mx: 2 }} key={index} raised={true} >
              <CardMedia
                component="img"
                height="200"
                src="https://i.epochtimes.com/assets/uploads/2018/05/dog-3313578-450x300.jpg"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: "bold" }}>
                  {petdata.Record.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  飼主：{petdata.Record.owner} < br />
                  品種：{petdata.Record.breed} < br />
                  晶片碼：{petdata.Record.chipID}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={() => handleCalculatePremium(index)} variant='contained' size="small">試算保費</Button>
                <Button onClick={() => {
                  setShowmode("purchase_insurance");
                  setTitle("投保");
                  setSingle_pet_data(petdata);
                }} variant='contained' size="small">投保</Button>
              </CardActions>

            </Card>
          ))}

        </Box> : null
      }


      {premium != 0 && (
        <Box>
          這是保費
          {premium}
        </Box>
      )}

    </Box>

  );
}

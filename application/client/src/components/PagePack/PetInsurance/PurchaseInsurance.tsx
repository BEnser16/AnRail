import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ProfileContent from '../MyPet/ProfileContent';
import CheckPetContent from '../MyPet/CheckPetContent';
import BreederService from '../../../service/breeder-service';
import AuthService from '../../../service/auth-service';
import InsuranceAgreeMent from './InsuranceAgreeMent';
import BackdropAnime from '../MyPet/BackDrop';


const steps = ['確認被保險人資料', '確認寵物資訊', '確認投保'];

export default function PurchaseInsurance(props:any) {
  const { single_pet_data , setSingle_pet_data} = props;
  const [activeStep, setActiveStep] = React.useState(0);
  const [userdata, setUserdata] = React.useState<any>();
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [open, setOpen] = React.useState(false);

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    // finsh 的時候
    if(activeStep == 2) {
      setOpen(true);
      let userobj = JSON.parse(AuthService.getCurrentUser().logindata);
      AuthService.getUserData(userobj.userID).then((responseData) => {
        console.log("response user Data is : " + JSON.stringify(responseData.data));
        setUserdata(JSON.stringify(responseData.data));
        console.log("userdata state is :");
        console.log(userdata);
        // pet age dognorcat 被寫死
        BreederService.enrollInsurance("insurance1" , userobj.userID , responseData.data.username , responseData.data.phone , responseData.data.birthDate , responseData.data.email , responseData.data.address , single_pet_data.Record.name
        ,single_pet_data.Record.gender , single_pet_data.Record.chipID ,single_pet_data.Record.birthday , 13 , true , 1 ).then((res) => {
          
          console.log("保單創建成功");
          setOpen(false);
          console.log(res);
        }).catch((error) => {
          console.log(error);
        });
      });
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      {open && <BackdropAnime/>}
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
              
              
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            資料確認完成! 投保請求已送出!
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          
          {activeStep === 0 &&
            <Box sx={{m:3 , mt:5}}>
                <ProfileContent />
            </Box>
            
          }
          {activeStep === 1 &&
            <Box sx={{m:3 , mt:5}}>
                <CheckPetContent single_pet_data={single_pet_data} setSingle_pet_data={setSingle_pet_data} />
            </Box>
            
          }
          {activeStep === 2 &&
            <Box sx={{m:3 , mt:5}}>
                <InsuranceAgreeMent/>
            </Box>
            
          }
          
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}

import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import breederService from '../../../service/breeder-service';
import authService from '../../../service/auth-service';

const steps = [
  '申請已送出',
  '審核中',
  '審核完成',
];

export default function AplyContractProgress() {
  let [contractList, setContractList] = React.useState< any>([]);
  let [step, setStep] = React.useState< any>(0);

  React.useEffect(() => {
    let userobj = JSON.parse(authService.getCurrentUser().logindata);
    breederService.getMyInsuranceContract(userobj.userID).then((res) => {

      console.log(res.data);
      setContractList(res.data);
      if(res.data[0].Record.ContractState == 'verify'){
        setStep(1);
      }
      if(res.data[0].Record.ContractState == 'complete'){
        setStep(2);
      }
    });
  } , []);

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" style={{ color: 'inherit' }} sx={{ my: 5 , mb:10 , fontWeight: "bold" }}>您的保單申請進度</Typography>
      <Stepper activeStep={step} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
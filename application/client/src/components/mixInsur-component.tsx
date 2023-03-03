import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InsurCalculate from './insurCalculate-component';
import BreederService from '../service/breeder-service';
import AuthService from '../service/auth-service';

export default function MixInsur(props:any) {
  let {allinsurData , setallinsurData} = props;
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
      if(newValue === "two"){
        var prse = JSON.stringify(allinsurData).toString();
        var obg = JSON.parse(prse)
        console.log("props all insur:" + allinsurData.petdata[0].Record.breed);
          
          

      };
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="保障內容" />
        <Tab value="two" label="試算保費/投保" />
         
        <Tab value="three" label="續保專區" />
        
      </Tabs>
      {value === "two" ? <InsurCalculate allinsurData={allinsurData} setallinsurData={setallinsurData} /> : null}

    </Box>
  );
}
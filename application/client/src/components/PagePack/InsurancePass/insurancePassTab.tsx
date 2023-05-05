import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function InsurancePassTab() {
  const [value, setValue] = React.useState('one');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab value="one" label="保障彙整" />
        <Tab value="two" label="保單列表" />
        <Tab value="three" label="保費明細" />
        <Tab value="four" label="繳費提醒" />
      </Tabs>
    </Box>
  );
}
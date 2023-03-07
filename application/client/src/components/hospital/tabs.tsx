import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ConditionRecord from './condition-record';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import HoRecordService from '../../service/ho-record-service';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props:any) {
  const [value, setValue] = React.useState(0);
  let {tabvalue , setTabvalue} = props;
  let {infoData , setInfoData} = props;
  let [newCondition , setNewCondition] = React.useState(false);
  let [new_condition_record , setNew_condition_record] = React.useState<{
    date:string,
    type:string,
    doctor:string,
    describe:string
  }>({
    date:"",
    type:"",
    doctor:"",
    describe:""
  });

  const handle_new_condition = () =>{
    setNewCondition(!newCondition);
  }

  const handle_create_new_condition = () =>{
    try {
      HoRecordService.create("R001" , infoData.chipID , new_condition_record?.date , new_condition_record?.type , new_condition_record?.doctor , new_condition_record?.describe , true);
    } catch(error) {
      console.log(error);
      setNewCondition(!newCondition);
    }

    console.log("成功新增病歷!!");
    
  }

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setTabvalue(newValue);
    if(newValue == 2 ) {
      
      HoRecordService.getallrecord().then((data) => {
        console.log("getallrecord返回值: " + data);
      }).catch((error) => {
        console.log(error);
      });
        
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="基本資料" {...a11yProps(0)} />
          <Tab label="生物藥品使用紀錄" {...a11yProps(1)} />
          <Tab label="病況紀錄" {...a11yProps(2)} />
          <Tab label="驅蟲紀錄" {...a11yProps(3)} />
          <Tab label="外科紀錄" {...a11yProps(4)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        藥品
      </TabPanel>
      <TabPanel value={value} index={2}>
        {!newCondition && (
          <Button variant="contained" onClick={handle_new_condition} sx={{mb:3}}>新增</Button>
        )}
        
        {newCondition && (
          <Box sx={{mb:3}}>
            <Typography variant="h5">
              新增病況
            </Typography>
            <TextField id="date" label="日期" variant="standard" value={new_condition_record?.date} sx={{mr:1}} /> 
            <TextField id="type" label="診療類型" variant="standard" value={new_condition_record?.type} sx={{mr:1}}  />
            <TextField id="doctor" label="主治醫師" variant="standard" value={new_condition_record?.doctor} sx={{mr:1}}  />
            <TextField id="describe" label="描述" variant="standard" value={new_condition_record?.describe} sx={{mr:1}}  />
            <Button variant="contained" onClick={handle_new_condition} >取消</Button>
            <Button variant="contained" onClick={handle_create_new_condition} >完成</Button>
          </Box>
          
        )}
        
        <ConditionRecord new_condition_record={new_condition_record} setNew_condition_record={setNew_condition_record} />
      </TabPanel>
    </Box>
  );
}
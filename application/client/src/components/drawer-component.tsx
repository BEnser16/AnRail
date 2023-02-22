import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import AuthService from '../service/auth-service';
import {useNavigate} from "react-router-dom";
import BreedSerivce from '../service/breeder-service';
import PetCard from './petcard-component';
import {IPet} from '../interface/pet';
import PetsIcon from '@mui/icons-material/Pets';
import MedicationIcon from '@mui/icons-material/Medication';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import LogoutIcon from '@mui/icons-material/Logout';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#009688',
      dark: '#006064',
      light: '#eceff1'
    },
    secondary: {
      main: '#673ab7',
      dark: '#121827',
      light: '#232b35'
    },
  },
});


const drawerWidth = 240;

export default function ClippedDrawer(props:any) {

  const navigate = useNavigate();
  let [sidebarmode , setSidebarmode] = React.useState('');
  let [midtitle , setMidtitle] = React.useState('Overview');
  let [mypetdata , setMypetdata] = React.useState<IPet[]>([]);
  let {currentUser , setCurrentUser} = props;

  const handleLogout = () => {
    AuthService.logout();
    window.alert("Logout successfully! now redirect to the home page. ");  
    navigate('/');
    setCurrentUser(null);
  };

  const handleMypets = () => {
    const usertoken = AuthService.getCurrentUser();
    console.log(usertoken);
    
    
    const userobj = JSON.parse(usertoken.logindata);
    
    BreedSerivce.getMypets(userobj.userID).then((response) => {
      console.log('第一筆');
      console.log(response.data.mypetlist[0].Record.name);
      setMypetdata(response.data.mypetlist);
      console.log('state');
      
      setSidebarmode('re');
      setSidebarmode('checkmypets');
      setMidtitle("我的寵物");

    });
    
    
  }

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ display: 'flex', bgcolor: 'primary.light', minHeight:"100vh"}}>
      <CssBaseline />
      
        <AppBar  position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1  , bgcolor: 'secondary.dark'}}>
          <Toolbar >
            <HealthAndSafetyIcon sx={{color:'primary.main'}}/>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 , mr: 2 , mx:2}}>
                Health
            </Typography>

            <Stack direction="row" spacing={1}>
              
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Stack>
            <Typography variant="subtitle1"  sx={{ m: 1}}>
              Remy Sharp
            </Typography>
            <Button variant="contained" onClick={handleLogout}  sx={{ml:3 , mr:1, bgcolor: 'primary.dark'}} >
              <LogoutIcon sx={{mr:1}}/>
              登出
              
            </Button>
            

          </Toolbar>
        </AppBar>
      
      <Drawer
        variant="permanent"
        
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          
        }}
      >
        <Toolbar />
        <Box sx={{ display:'flex' , flexDirection:"column" , overflow: 'auto' , bgcolor: 'primary.light' , minHeight:969}} >
          <List >
            {['我的寵物', '診療紀錄', '寵物保險', '醫療查詢'].map((text, index) => (
              
              <ListItem key={text} disablePadding  sx={{mt:2}} >
                { index === 0 ? 
                  <ListItemButton  onClick={handleMypets}>
                      
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <PetsIcon></PetsIcon>
                      </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit' , fontWeight:"bold"}}>{text}</Typography>} />
                  </ListItemButton>
                  :
                  <ListItemButton >
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <MedicationIcon></MedicationIcon>
                      </ListItemIcon>
                    <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit' , fontWeight:"bold"}}>{text}</Typography>}/>
                  </ListItemButton>

                }

              </ListItem>
            ))}
          </List>
          
        </Box>
        
      </Drawer>
      
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        <Container maxWidth="xl">
          <Typography variant="h4" style={{ color: 'inherit' }} sx={{mb:4 , mt:2 , fontWeight:"bold"}}>{midtitle}</Typography>
          
          {sidebarmode === "checkmypets" ? <PetCard mypetdata={mypetdata} setMypetdata={setMypetdata}  /> : null}
        </Container>
        
        
        
      </Box>
      
    </Box>
    </ThemeProvider>
    
  );
}

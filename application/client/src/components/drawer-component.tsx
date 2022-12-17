import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import AuthService from '../service/auth-service';
import {useNavigate} from "react-router-dom";
import BreedSerivce from '../service/breeder-service';
import PetCard from './petcard-component';
import {IPet} from '../interface/pet';

const drawerWidth = 240;

export default function ClippedDrawer(props:any) {

  const navigate = useNavigate();
  let [sidebarmode , setSidebarmode] = React.useState('');
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

    });
    
    
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar color="inherit" position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 , mr: 2}}>
            飼主用戶端
          </Typography>

          <Stack direction="row" spacing={1}>
            
            <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          </Stack>
          <Typography variant="subtitle1"  sx={{ m: 1}}>
            Remy Sharp
          </Typography>
          <Button variant="outlined" onClick={handleLogout} color="warning" sx={{ml:3 , mr:1}} >
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
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['我的寵物', '診療紀錄', '寵物投保', '保險資料'].map((text, index) => (
              
              <ListItem key={text} disablePadding>
                { index === 0 ? 
                  <ListItemButton onClick={handleMypets} >
                      
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                  :
                  <ListItemButton >
                      <ListItemIcon>
                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                      </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>

                }
                



              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        
        {sidebarmode === "checkmypets" ? <PetCard mypetdata={mypetdata} setMypetdata={setMypetdata}  /> : null}
        
        
      </Box>
      
    </Box>
    
  );
}

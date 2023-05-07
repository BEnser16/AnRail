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
import { useNavigate } from "react-router-dom";
import BreederSerivce from '../service/breeder-service';
import PetCard from './petcard-component';
import { IPet } from '../interface/IPet';
import PetsIcon from '@mui/icons-material/Pets';
import MedicationIcon from '@mui/icons-material/Medication';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Container from '@mui/material/Container';
import LogoutIcon from '@mui/icons-material/Logout';
import InsurCard from './insurCard-component';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import CurrentPetBar from './PagePack/MyPet/CurrentPetBar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InsurancePassTab from './PagePack/InsurancePass/insurancePassTab';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ProfileContent from './PagePack/MyPet/ProfileContent';
import EditProfile from './PagePack/MyPet/EditProfile';
import AplyContractProgress from './PagePack/ProgressSearch/AplyContractProgress';
import MyContractList from './PagePack/InsurancePass/MyContractList';

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

const settings = ['個人資料', '設定', '幫助'];

const drawerWidth = 240;

export default function ClippedDrawer(props: any) {

  const navigate = useNavigate();
  let [sidebarmode, setSidebarmode] = React.useState('');
  let [midtitle, setMidtitle] = React.useState('Overview');
  let [mypetdata, setMypetdata] = React.useState<IPet[]>([]);
  let [allinsurData, setallinsurData] = React.useState({});
  let { currentUser, setCurrentUser } = props;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


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

    BreederSerivce.getMypets(userobj.userID).then((response) => {
      const usertoken = AuthService.getCurrentUser();
      console.log(currentUser);
      console.log("user token: " + usertoken);
      console.log("first data: " + response.data.mypetlist[0].Record.name);
      setMypetdata(response.data.mypetlist);
      setSidebarmode('re');
      setSidebarmode('checkmypets');
      setMidtitle("我的寵物");

    });


  }

  function handleInsurance() {
    const usertoken = AuthService.getCurrentUser();
    console.log("user token: " + usertoken);
    const userobj = JSON.parse(usertoken.logindata);

    BreederSerivce.getAllInsurance(userobj.userID).then((response) => {
      console.log('保險返回值:');
      console.log(response.data.resultObject);
      //  要先有mypetdata state
      setallinsurData({
        insurData: response.data.resultObject,
        petdata: mypetdata,
        userID: userobj.userID
      });
      setSidebarmode('re');
      setSidebarmode('checkinsurance');
      setMidtitle("寵物保險");

    });
  }

  function handleInsurancePass() {
    setSidebarmode('re');
    setSidebarmode('check_insurance_pass');
    setMidtitle("保險存摺");
  }

  function handleSearchProgress(){
    setSidebarmode('re');
    setSidebarmode('search');
    setMidtitle("醫療查詢");
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };


  React.useEffect(() => {
    handleMypets();
  }, []);

  if (mypetdata.length == 0) {
    return <div>Loading...</div>
  }

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.light', minHeight: "100vh" }}>
        <CssBaseline />

        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'secondary.dark' }}>
          <Toolbar >
            <HealthAndSafetyIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, mr: 2, mx: 2 }}>
              Health
            </Typography>
            <MenuItem>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <NotificationsIcon />
              </IconButton>
              
            </MenuItem>
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleOpenUserMenu}
                >
                  <Stack direction="row" spacing={1}>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" sx={{ width: 32, height: 32 }} />
                  </Stack>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => {
                    
                    if(setting == '個人資料') {
                      setSidebarmode('re');
                      setSidebarmode('check_profile');
                      setMidtitle("個人資料");
                      
                    }
                  }}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Button variant="contained" onClick={handleLogout} sx={{ ml: 3, mr: 1, bgcolor: 'primary.dark' }} >
              <LogoutIcon sx={{ mr: 1 }} />
              登出

            </Button>


          </Toolbar>

        </AppBar>

        <Drawer
          variant="permanent"

          sx={{
            width: drawerWidth,
            flexShrink: 0,
            bgcolor: 'primary.light',
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },

          }}
        >
          <Toolbar />
          <Box sx={{ display: 'flex', flexDirection: "column" }} >
            <List >
              {['我的寵物', '保險存摺', '寵物投保', '醫療查詢'].map((text, index) => (

                <ListItem key={text} disablePadding sx={{ mt: 4 }} >
                  {index === 0 &&
                    <ListItemButton onClick={handleMypets}>

                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <PetsIcon></PetsIcon>
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit', fontWeight: "bold" }}>{text}</Typography>} />
                    </ListItemButton>
                  }
                  {index === 1 &&
                    <ListItemButton onClick={handleInsurancePass}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <ReceiptLongIcon></ReceiptLongIcon>
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit', fontWeight: "bold" }}>{text}</Typography>} />
                    </ListItemButton>

                  }
                  {index === 2 &&
                    <ListItemButton onClick={handleInsurance}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <MedicationIcon></MedicationIcon>
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit', fontWeight: "bold" }}>{text}</Typography>} />
                    </ListItemButton>

                  }
                  {index === 3 &&
                    <ListItemButton onClick={handleSearchProgress}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <SearchIcon></SearchIcon>
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit', fontWeight: "bold" }}>{text}</Typography>} />
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

            <Typography variant="h4" style={{ color: 'inherit' }} sx={{ mb: 4, mt: 2, fontWeight: "bold" }}>{midtitle}</Typography>

            {sidebarmode === "checkmypets" ? <PetCard mypetdata={mypetdata} setMypetdata={setMypetdata} /> : null}
            {sidebarmode === "checkinsurance" ? <InsurCard allinsurData={allinsurData} setallinsurData={setallinsurData} /> : null}
            {sidebarmode === "check_insurance_pass" ? <MyContractList /> : null}
            {sidebarmode === "check_profile" ? <EditProfile /> : null}
            
            {sidebarmode === "search" ? <AplyContractProgress /> : null}
            
            
          </Container>



        </Box>

      </Box>
    </ThemeProvider>

  );
}

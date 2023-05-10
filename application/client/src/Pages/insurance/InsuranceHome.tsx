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
import { useNavigate } from "react-router-dom";
import PetsIcon from '@mui/icons-material/Pets';
import MedicationIcon from '@mui/icons-material/Medication';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import Container from '@mui/material/Container';
import LogoutIcon from '@mui/icons-material/Logout';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import authService from '../../service/auth-service';
import breederService from '../../service/breeder-service';
import insurancerService from '../../service/insurancer-service';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { IInsuranceContract } from '../../interface/IInsuranceContract';
import BackdropAnime from '../../components/PagePack/MyPet/BackDrop';
import { colors } from '@mui/material';



const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#673ab7',
      dark: '#673ab7',
      light: '#fafafa'
    },
    secondary: {
      main: '#673ab7',
      dark: '#673ab7',
      light: '#7c4dff'
    },
  },
});

const settings = ['個人資料', '設定', '幫助', '登出'];

const drawerWidth = 240;

export default function InsurancerHome(props: any) {

  const navigate = useNavigate();
  let [sidebarmode, setSidebarmode] = React.useState('verify');
  let [midtitle, setMidtitle] = React.useState('投保審核');
  let [contractList, setContractList] = React.useState<any>([]);
  let [open, setOpen] = React.useState(false);
  let [backopen, setBackopen] = React.useState(false);
  let { currentUser, setCurrentUser } = props;
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


  const handleLogout = () => {
    authService.logout();
    window.alert("Logout successfully! now redirect to the home page. ");
    navigate('/');
    setCurrentUser(null);
  };


  function handleInsuranceVerify() {
    setSidebarmode('re');
    setSidebarmode('verify');
    setMidtitle("投保審核");
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleVerifyPass() {
    setBackopen(true);
    let newContract:IInsuranceContract = contractList[0].Record;
    newContract.ContractState = 'complete';
    insurancerService.changeInsuranceContractState(newContract.ContractID , newContract.ContractState).then((res) => {
      console.log(res);
      console.log("change contract state complete!");
      window.alert(
        "審核通過!"
      );
      setBackopen(false);
    }).catch((error) => {
      console.log(error);
    }) 
  }


  React.useEffect(() => {
    console.log(contractList.length);
    let userobj = JSON.parse(authService.getCurrentUser().logindata);
    insurancerService.getAllInsuranceContract().then((res) => {

      console.log(res.data);
      setContractList(res.data);
      if(res.data.length != 0) {
        setOpen(true);
      } else {
        setMidtitle("目前無審核請求")
      }
      
    });
  }, []);

  // if (mypetdata.length == 0) {
  //   return <div>Loading...</div>
  // }

  return (
    <ThemeProvider theme={theme}>
      {backopen && <BackdropAnime />}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'primary.light', minHeight: "100vh" }}>
        <CssBaseline />

        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: 'secondary.dark' }}>
          <Toolbar >
            <HealthAndSafetyIcon sx={{ color: 'primary.light' }} />
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, mr: 2, mx: 2 }}>
              Insurance Company
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

                    if (setting == '個人資料') {
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
            <Button variant="contained" onClick={handleLogout} sx={{ ml: 3, mr: 1, bgcolor: 'secondary.light' }} >
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
              {['發行保險', '投保審核', '寵物投保', '醫療查詢'].map((text, index) => (

                <ListItem key={text} disablePadding sx={{ mt: 4 }} >
                  {/* {index === 0 &&
                    <ListItemButton >

                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <PetsIcon></PetsIcon>
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit', fontWeight: "bold" }}>{text}</Typography>} />
                    </ListItemButton>
                  } */}
                  {index === 1 &&
                    <ListItemButton onClick={handleInsuranceVerify}>
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <ReceiptLongIcon></ReceiptLongIcon>
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit', fontWeight: "bold" }}>{text}</Typography>} />
                    </ListItemButton>

                  }
                  {/* {index === 2 &&
                    <ListItemButton >
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <MedicationIcon></MedicationIcon>
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit', fontWeight: "bold" }}>{text}</Typography>} />
                    </ListItemButton>

                  }
                  {index === 3 &&
                    <ListItemButton >
                      <ListItemIcon sx={{ color: 'primary.main' }}>
                        <SearchIcon></SearchIcon>
                      </ListItemIcon>
                      <ListItemText primary={<Typography variant="body1" style={{ color: 'inherit', fontWeight: "bold" }}>{text}</Typography>} />
                    </ListItemButton>

                  } */}

                </ListItem>
              ))}

            </List>


          </Box>

        </Drawer>


        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />

          <Container maxWidth="xl">

            <Typography variant="h4" style={{ color: 'inherit' }} sx={{ mb: 4, mt: 2, fontWeight: "bold" }}>{midtitle}</Typography>

            {/* {sidebarmode === "checkmypets" ? <PetCard mypetdata={mypetdata} setMypetdata={setMypetdata} /> : null}
            {sidebarmode === "checkinsurance" ? <InsurCard allinsurData={allinsurData} setallinsurData={setallinsurData} /> : null}
            {sidebarmode === "check_insurance_pass" ? <InsurancePassTab /> : null}
            {sidebarmode === "check_profile" ? <EditProfile /> : null} */}
            {sidebarmode === "verify" && open ?
              <div>
                <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>方案名稱: 米得寵 </TableCell>
                        <TableCell>被保險人資料</TableCell>


                      </TableRow>

                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>寵物名稱:{ contractList[0].Record.PetName} </TableCell>
                        <TableCell>姓名:{ contractList[0].Record.ProposerName} </TableCell>


                      </TableRow>
                      <TableRow>
                        <TableCell>寵物晶片號:{ contractList[0].Record.PetChipID} </TableCell>
                        <TableCell>身份證字號:{ contractList[0].Record.ProposerID} </TableCell>


                      </TableRow>
                      <TableRow>
                        <TableCell>寵物生日:{ contractList[0].Record.PetBornDate} </TableCell>
                        <TableCell>電子郵件:{ contractList[0].Record.ProposerEmail} </TableCell>


                      </TableRow>
                      <TableRow>
                        <TableCell>寵物晶片號:{ contractList[0].Record.PetChipID} </TableCell>
                        <TableCell>地址:{ contractList[0].Record.ProposeAddress} </TableCell>


                      </TableRow>



                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{display:'flex' ,ml:'auto' ,  my:2}}>
                  <Button variant="contained" sx={{mr:3}} onClick={handleVerifyPass}>通過</Button>
                  <Button variant="contained" color="error" onClick={handleVerifyPass}>不通過</Button>
                </Box>
                

              </div>
              : null}
          </Container>



        </Box>

      </Box>
    </ThemeProvider>

  );
}

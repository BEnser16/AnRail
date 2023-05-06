import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import {useNavigate} from "react-router-dom";
import AuthService from '../service/auth-service';
import FormControl from '@mui/material/FormControl';
import { Footer } from './Layout';
import { Fullscreen, Height, Margin } from '@mui/icons-material';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    },
  },
});

export default function SignIn() {
  
  const navigate = useNavigate();

  let [role, setRole] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value as string);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });

    let userid =  data.get('email');
    let password = data.get('password');
    if(role === "醫療人員") {
      AuthService.loginhospital( role ,userid , password).then((response) => {
        console.log(role);
        console.log(response.data);
        if(response.data.token) {
          localStorage.setItem("user" , JSON.stringify(response.data));
        }
        // setCurrentUser(AuthService.getCurrentUser());
        navigate("/hospitalhome");
      }).catch(error => {
        console.log("sending to Auth service catch error...");
        console.log(error.response);
      });
       
    } else if(role === "一般飼主") {
      AuthService.loginbreeder( role ,userid , password).then((response) => {
        console.log(role);
        console.log(response.data);
        if(response.data.token) {
          localStorage.setItem("user" , JSON.stringify(response.data));
        }
        // setCurrentUser(AuthService.getCurrentUser());
        navigate("/home");
      }).catch(error => {
        console.log("sending to Auth service catch error...");
        console.log(error.response);
      });;
     
    } else if(role === "保險業者") {
      AuthService.logininsurancer( role ,userid , password).then((response) => {
        
        console.log("登入角色" + role + "insurancer login res data is : " + response.data);
        if(response.data.token) {
          localStorage.setItem("user" , JSON.stringify(response.data));
        }
        // setCurrentUser(AuthService.getCurrentUser());
        navigate("/insurancehome");
      }).catch(error => {
        console.log("sending to Auth service catch error... API login insurancer");
        console.log(error.response);
      });;
    }  
    

  };

  



  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        display:"flex" , flexDirection: 'column', minHeight:1200 , zIndex:"tooltip" , height:'100%' , bgcolor: 'primary.dark' }} >
        <Container component="main" maxWidth="md" >
          
          <Box
            sx={{
              marginTop: 18,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: 'primary.light',
              px:14,
              py:8,
              marginX:4,
              borderRadius: '16px'
              
            }}
            
          >
            <Avatar sx={{ mb: 3, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              歡迎登入
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 4 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">身份</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="role"
                    onChange={handleChange}
                  >
                    <MenuItem value={"一般飼主"}>一般飼主</MenuItem>
                    <MenuItem value={"醫療人員"}>醫療人員</MenuItem>
                    <MenuItem value={"保險業者"}>保險業者</MenuItem>
                    <MenuItem value={"政府人員"}>政府人員</MenuItem>
                  </Select>
              </FormControl>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="身分證字號"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="密碼"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="記住我"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                登入
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    忘記密碼?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"還沒有帳號嗎? 按我註冊"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
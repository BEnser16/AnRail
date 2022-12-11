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

const theme = createTheme();

export default function SignIn() {
  
  const navigate = useNavigate();

  const [role, setRole] = React.useState('');

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
     
    }

    

  };

  



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
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
              label="使用者名稱"
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
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
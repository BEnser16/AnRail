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
import AuthService from '../service/auth-service';
import {useNavigate} from "react-router-dom";
import BackdropAnime from './PagePack/MyPet/BackDrop';


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

export default function SignUp() {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setOpen(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      userID:data.get('userID'),
      email: data.get('email'),
      password: data.get('password'),
    });

    const userID = data.get('userID');
    const email = data.get('email');
    const password = data.get('password');
    const username = data.get('username');

    if(data.get('checkpassword') === password) {
      AuthService.register(userID , username ,email , password).then(() => {
        window.alert(
            "Registration success! redirect to the login page!"
        );
        setOpen(false);
        navigate("/");
      }).catch(error => {
          console.log("發送登入請求遭遇錯誤");
          console.log(error.response);
          
      });
    } else {
      window.alert(
        "確認密碼錯誤!"
      );
      setOpen(false);
    }

  };

  return (
    <ThemeProvider theme={theme}>
      {open && <BackdropAnime/>}
      <Box sx={{
        display:"flex" , flexDirection: 'column', minHeight:1100 , zIndex:"tooltip" , height:'100%' , bgcolor: 'primary.dark' }} >
        <Container component="main" maxWidth="sm" sx={{bgcolor: 'primary.light' , mt:12 , borderRadius: '16px' }}>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pb:8 , 
              px:8
            }}
          >
            <Avatar sx={{ mb:2 , m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              歡迎註冊
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="userID"
                    required
                    fullWidth
                    id="userID"
                    label="身份證字號"
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="使用者名稱"
                    autoFocus
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="電子郵件"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="密碼"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="checkpassword"
                    label="確認密碼"
                    type="password"
                    id="checkpassword"
                    autoComplete="new-password"
                  />
                </Grid>
                
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                註冊
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                   已經有帳號了嗎? 登入
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
        </Container>
      </Box>
    </ThemeProvider>
  );
}
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import AuthService from '../../../service/auth-service';
import { IUserData } from '../../../interface/IUserData';



export default function ProfileContent() {
    let [userdata, setUserdata] = React.useState<IUserData>();

    async function getUserData(userID:string) {
        const userdata:any = AuthService.getUserData(userID);
        return userdata;
    }

    React.useEffect(() => {
        const userobj = JSON.parse(AuthService.getCurrentUser().logindata);
        console.log("userobj is " + userobj.userID);
        getUserData(userobj.userID).then((responseData) => {
            console.log("responseData is " + JSON.stringify(responseData.data));
            setUserdata(responseData.data);
        });
        
        console.log("userdata is " + userdata?.username);
        
    }, []);

    return (
        <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>

                </TableHead>
                <TableBody>
                    <TableRow>
                        <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" sx={{ width: 130, height: 140, m: 4 }} />

                        <TableCell>名稱:{userdata?.username} </TableCell>
                        <TableCell>身分證字號:{userdata?.userID}</TableCell>
        

                    </TableRow>
                    <TableRow>
                        <TableCell>電話:{userdata?.phone}</TableCell>

                        
                        <TableCell>出生日期:{userdata?.birthDate || ""}</TableCell>


                    </TableRow>
                    <TableRow>
                        <TableCell>電子郵件:{userdata?.email} </TableCell>
                        <TableCell>聯絡地址:{userdata?.address || ""}</TableCell>
                    </TableRow>
                    


                </TableBody>
            </Table>
        </TableContainer>
    );
}

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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ProfileContent from './ProfileContent';
import BackdropAnime from './BackDrop';





export default function EditProfile() {
    let [userdata, setUserdata] = React.useState<IUserData | any>({
        userID: "",
        username: "",
        birthDate: "",
        email: "",
        phone: 12345,
        role: "",
        address: "",

    });

    let [newUserdata, setNewUserdata] = React.useState<IUserData | any>({
        userID: userdata.userID,
        username: userdata.username,
        birthDate: "",
        email: "",
        phone: 12345,
        role: "",
        address: "台北市",

    });
    let [editmode, setEditmode] = React.useState<boolean>(false);
    let [backdrop, setBackdrop] = React.useState<boolean>(false);

    async function getUserData(userID: string) {
        const userdata: any = AuthService.getUserData(userID);
        return userdata;
    }



    const handleSubmit = () => {
        setBackdrop(true);
        console.log(newUserdata);

        AuthService.changeUserData(newUserdata.userID, newUserdata.username, newUserdata.email, newUserdata.address, newUserdata.birthDate, newUserdata.phone).then((res) => {
            console.log(res);
            setBackdrop(false);
            window.location.reload();
        });
    };

    React.useEffect(() => {
        const userobj = JSON.parse(AuthService.getCurrentUser().logindata);
        console.log("userobj is " + userobj.userID);
        getUserData(userobj.userID).then((responseData) => {
            console.log("responseData is " + JSON.stringify(responseData.data));
            setUserdata(responseData.data);
        });

    }, []);

    return (
        <Box>
            {backdrop && <BackdropAnime />}
            {!editmode && <ProfileContent />}
            {editmode &&
                <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>

                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>

                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80" sx={{ width: 130, height: 140, m: 4 }} />

                                <TableCell>名稱:{userdata?.username} </TableCell>
                                <TableCell>身分證字號:{userdata?.userID}</TableCell>


                            </TableRow>
                            <TableRow>
                                <TableCell><TextField id="filled-basic" label="電話" variant="filled" value={newUserdata.phone} defaultValue={userdata?.phone} onChange={(e) => {
                                    setNewUserdata({
                                        userID: userdata.userID,
                                        username: userdata.username,
                                        birthDate: newUserdata.birthDate,
                                        email: newUserdata.email,
                                        phone: Number(e.target.value),

                                        address: newUserdata.address,

                                    });
                                }} /></TableCell>



                                <TableCell><TextField id="filled-basic" label="出生日期" variant="filled" value={newUserdata.birthDate} defaultValue={userdata?.birthDate} onChange={(e) => {
                                    setNewUserdata({
                                        userID: userdata.userID,
                                        username: userdata.username,
                                        birthDate: e.target.value,
                                        email: newUserdata.email,
                                        phone: newUserdata.phone,

                                        address: newUserdata.address,

                                    });
                                }} /></TableCell>


                            </TableRow>
                            <TableRow>
                                <TableCell><TextField id="filled-basic" label="電子郵件" variant="filled" value={newUserdata.email} defaultValue={userdata?.email} onChange={(e) => {
                                    setNewUserdata({
                                        userID: userdata.userID,
                                        username: userdata.username,
                                        birthDate: newUserdata.birthDate,
                                        email: e.target.value,
                                        phone: newUserdata.phone,

                                        address: newUserdata.address,

                                    });
                                }}></TextField> </TableCell>
                                <TableCell><TextField id="filled-basic" label="聯絡地址" variant="filled" value={newUserdata.address} defaultValue={userdata?.address} onChange={(e) => {
                                    setNewUserdata({
                                        userID: userdata.userID,
                                        username: userdata.username,
                                        birthDate: newUserdata.birthDate,
                                        email: newUserdata.email,
                                        phone: newUserdata.phone,

                                        address: e.target.value,

                                    });
                                }} /></TableCell>
                            </TableRow>



                        </TableBody>
                    </Table>

                </TableContainer>
            }

            <Button sx={{ py: 1, px: 4, m: 2, position: 'inherit' }} variant="contained" onClick={() => { setEditmode(!editmode) }}>{editmode ? "取消" : "編輯" }</Button>
            <Button sx={{ py: 1, px: 4, m: 2, position: 'inherit' }} variant="contained" onClick={handleSubmit}>儲存</Button>
        </Box>

    );
}

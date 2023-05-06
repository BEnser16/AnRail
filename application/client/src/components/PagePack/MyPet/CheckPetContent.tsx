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



export default function CheckPetContent(props:any) {
    const { single_pet_data , setSingle_pet_data} = props;

    
    React.useEffect(() => {
        
        console.log("singlepet is " + JSON.stringify(single_pet_data));
       
        
    }, []);

    return (
        <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>

                </TableHead>
                <TableBody>
                    <TableRow>
                        <Avatar alt="Remy Sharp" src="https://i.epochtimes.com/assets/uploads/2018/05/dog-3313578-450x300.jpg" sx={{ width: 170, height: 160, m: 4 }} />

                        <TableCell>名稱: {single_pet_data.Record.name}</TableCell>

                        <TableCell>飼主:{single_pet_data.Record.owner}</TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell>電話:{single_pet_data.Record.phone}</TableCell>

                        <TableCell>晶片號:{single_pet_data.Record.chipID}</TableCell>
                        <TableCell>生日:{single_pet_data.Record.birthday}</TableCell>


                    </TableRow>
                    <TableRow>
                        <TableCell>血型:{single_pet_data.Record.bloodType}</TableCell>
                        <TableCell>性別:{single_pet_data.Record.gender}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>結紮:{single_pet_data.Record.ligtion}</TableCell>
                        <TableCell>過敏:{single_pet_data.Record.allergy}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>重大疾病:{single_pet_data.Record.majorDiseases}</TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell>備註:{single_pet_data.Record.remark}</TableCell>

                    </TableRow>
                    <TableRow>
                        <TableCell>所屬病院:{single_pet_data.Record.hospital}</TableCell>

                    </TableRow>


                </TableBody>
            </Table>
        </TableContainer>
    );
}

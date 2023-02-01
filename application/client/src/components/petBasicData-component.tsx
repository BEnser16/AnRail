import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {IPet} from '../interface/pet';
import Avatar from '@mui/material/Avatar';



export default function BasicTable(props:IPet[] | any) {
    let {mypetdata , setMypetdata} = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 , mt: 3}} aria-label="simple table">
        <TableHead>
         
        </TableHead>
        <TableBody>
            <TableRow>
            <Avatar alt="Remy Sharp" src="https://i.epochtimes.com/assets/uploads/2018/05/dog-3313578-450x300.jpg" sx={{ width: 170, height: 160 , mb: 4 }} />
            
                <TableCell>名稱: {mypetdata[0].Record.name}</TableCell>
                
                <TableCell>飼主:{mypetdata[0].Record.owner}</TableCell>
                
            </TableRow>
            <TableRow>
                <TableCell>電話:{mypetdata[0].Record.phone}</TableCell>
                
                <TableCell>晶片號:{mypetdata[0].Record.chipID}</TableCell>
                <TableCell>生日:{mypetdata[0].Record.birthday}</TableCell>
                
                
            </TableRow>
            <TableRow>
                <TableCell>血型:{mypetdata[0].Record.bloodType}</TableCell>
                <TableCell>性別:{mypetdata[0].Record.gender}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>結紮:{mypetdata[0].Record.ligtion}</TableCell>
                <TableCell>過敏:{mypetdata[0].Record.allergy}</TableCell>
            </TableRow>
            <TableRow>
                <TableCell>重大疾病:{mypetdata[0].Record.majorDiseases}</TableCell>
                
            </TableRow>
            <TableRow>
                <TableCell>備註:{mypetdata[0].Record.remark}</TableCell>
                
            </TableRow>
            <TableRow>
                <TableCell>所屬病院:{mypetdata[0].Record.hospital}</TableCell>
                
            </TableRow>
            
            
        </TableBody>
      </Table>
    </TableContainer>
  );
}

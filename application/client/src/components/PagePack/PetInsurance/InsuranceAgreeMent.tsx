import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const InsuranceAgreeMent = () => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>

                </TableHead>
                <TableBody>
                    <TableRow>
                       
                        <TableCell>名稱 </TableCell>
                        <TableCell>身分證字號</TableCell>
        

                    </TableRow>
                    <TableRow>
                        <TableCell>電話</TableCell>

                        
                        <TableCell>出生日期:</TableCell>


                    </TableRow>
                    <TableRow>
                        <TableCell>電子郵件:</TableCell>
                        <TableCell>聯絡地址:</TableCell>
                    </TableRow>
                    


                </TableBody>
            </Table>
        </TableContainer>
  )
}

export default InsuranceAgreeMent

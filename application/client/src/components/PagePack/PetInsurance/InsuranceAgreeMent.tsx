import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

const InsuranceAgreeMent = () => {
  return (
    <TableContainer component={Paper} sx={{ borderRadius: "12px" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>

                </TableHead>
                <TableBody>
                    <TableRow>
                       
                        <TableCell>確認保險條款 </TableCell>
                        <TableCell> 是<Checkbox   />
                        否<Checkbox  />
                        </TableCell>
        

                    </TableRow>
                    <TableRow>
                       
                        <TableCell>是否已投保其他寵物保險 </TableCell>
                        <TableCell> 是<Checkbox   />
                        否<Checkbox  />
                        </TableCell>
        

                    </TableRow>
                    <TableRow>
                       
                        <TableCell>過去一年內被保險寵物是否服用貨施打疫苗 </TableCell>
                        <TableCell> 是<Checkbox   />
                        否<Checkbox  />
                        </TableCell>
        

                    </TableRow>


                </TableBody>
            </Table>
        </TableContainer>
  )
}

export default InsuranceAgreeMent

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  date: string,
  type: string,
  doctor: string,
  describe: string,
  
) {
  return { date, type, doctor, describe };
}

const rows = [
  createData('2020-10-01', "一般門診", "劉依詩", "拉肚子 嘔吐，吃藥觀察，三天後回診"),
  
];

export default function BasicTable(props:any) {
  let {new_condition_record , setNew_condition_record} = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>日期</TableCell>
            <TableCell align="right">診療類型</TableCell>
            <TableCell align="right">主治醫師</TableCell>
            <TableCell align="right">描述</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.type}</TableCell>
              <TableCell align="right">{row.doctor}</TableCell>
              <TableCell align="right">{row.describe}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
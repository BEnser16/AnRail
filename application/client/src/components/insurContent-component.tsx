import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from '@mui/material/Typography';
import { Box } from "@mui/material";

function createData(
  type: string,
  act: string,
  price: string,
  
) {
  return { type, act, price };
}

const rows = [
  createData("寵物醫療費用", "門診費用", "不保在內"),
  createData("寵物侵權責任", "合併單一限額", "$500,000"),
  createData("寵物寄宿日額費用", "保險期間內累積最高賠償限額", "每日限額$1,000 最高10日"),
  createData("寵物喪葬費用", "保險期間內累積最高賠償限額","$3000"),
  createData("寵物重新認養費用", "保險期間內累積最高賠償限額", "$3000"),
  createData("汪汪米克斯", "未滿8歲6個月", "$1,508"),
  createData("喵喵米克斯", "未滿8歲6個月" , "$1,200"),
];

export default function InsurContent() {
  return (
    <Box>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ fontWeight: "bold" , my:2 }}
      >
        符合投保資格的寵物:
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>種類</TableCell>
              <TableCell >項目</TableCell>
              <TableCell align="right">方案一</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.type}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.type}
                </TableCell>
                <TableCell >{row.act}</TableCell>
                <TableCell align="right">{row.price}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function CurrentPetBar() {
  const theme = useTheme();

  return (
    <Box sx={{display:'flex'}}>
      <Stack direction="column" spacing={2} >
        <Avatar
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
          sx={{ width: 56, height: 56 }}
        />
        
      </Stack>
      <Typography variant="h5" style={{ color: 'inherit' }} sx={{ml:3}}>目前寵物</Typography>
      

    </Box>

  );
}

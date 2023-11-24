import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Landing = () => {
    return (
        <Box
            sx={{
                textAlign: 'center',
                marginTop: '50px',
                padding: '20px',
                backgroundColor: '#4A6572 ', // Example background color
            }}
        >
            <Typography variant="h2" color="#F9AA33">
                There will be a landing page here.Na foran vali hatman
            </Typography>
        </Box>
    );
};

export default Landing;

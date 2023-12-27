import React from 'react';
import { Typography, Paper } from '@mui/material';
import Box from "@mui/material/Box";

const About = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                About Us
            </Typography>
            <Typography>
                Welcome to Our Website! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                convallis libero in turpis fringilla, nec bibendum justo feugiat.
            </Typography>
        </Box>
    );
};

export default About;
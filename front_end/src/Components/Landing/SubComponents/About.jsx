import React from 'react';
import { Typography, Paper } from '@mui/material';
import Box from "@mui/material/Box";

const About = () => {
    return (
        <Box>
            <Typography variant="h3" gutterBottom>
                درباره ما
            </Typography>
            <Typography>
                به منظور سهولت و راحتی کار دانشجویان، گردهم آمدیم تا سامانه ای را راه اندازی کنیم که از طریق آن آموزش راحت تر و سریعتر شود.
            </Typography>
        </Box>
    );
};

export default About;
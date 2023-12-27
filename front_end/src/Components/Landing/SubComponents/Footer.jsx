import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box>
            <Box textAlign='center' marginTop={'50px'}>
                <Container>
                    <Typography>
                        &copy; 2020 Issaaf Kattan React Land Page Template. Design by{' '}
                        <a href='http://www.templatewire.com' rel='nofollow'>
                            TemplateWire
                        </a>
                    </Typography>
                </Container>
            </Box>
        </Box>
    );
};

export default Footer;

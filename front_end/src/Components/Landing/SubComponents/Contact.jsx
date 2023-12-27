import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import Box from "@mui/material/Box";
const Contact = (props) => {
    return (
        <Box id='contact' >
            <Container>
                <Grid item xs={12} md={3} offset={1} className='contact-info'>
                    <div className='contact-item'>
                        <Typography variant='h3'>راه های ارتباطی</Typography>
                        <Typography>
                            <span>
                              <i className='fa fa-map-marker'></i> آدرس:
                            </span>
                            {props.data ? props.data.address : 'loading'}
                        </Typography>
                    </div>
                    <div className='contact-item'>
                        <Typography>
                            <span>
                              <i className='fa fa-phone'></i> شماره همراه:
                            </span>{' '}
                            {props.data ? props.data.phone : 'loading'}
                        </Typography>
                    </div>
                    <div className='contact-item'>
                        <Typography>
                            <span>
                              <i className='fa fa-envelope-o'></i> ایمیل:
                            </span>{' '}
                            {props.data ? props.data.email : 'loading'}
                        </Typography>
                    </div>
                </Grid>
            </Container>
        </Box>
    );
};

export default Contact;

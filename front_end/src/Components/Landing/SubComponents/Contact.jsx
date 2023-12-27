import React, { useState } from 'react';
import { Container, Grid, Typography, TextField, TextareaAutosize, Button } from '@mui/material';
import Box from "@mui/material/Box";

const initialState = {
    name: '',
    email: '',
    message: '',
};

const Contact = (props) => {
    return (
        <Box id='contact' >
            <Container>
                <Grid item xs={12} md={3} offset={1} className='contact-info'>
                    <div className='contact-item'>
                        <Typography variant='h3'>Contact Info</Typography>
                        <Typography>
                            <span>
                              <i className='fa fa-map-marker'></i> Address
                            </span>
                            {props.data ? props.data.address : 'loading'}
                        </Typography>
                    </div>
                    <div className='contact-item'>
                        <Typography>
                            <span>
                              <i className='fa fa-phone'></i> Phone
                            </span>{' '}
                            {props.data ? props.data.phone : 'loading'}
                        </Typography>
                    </div>
                    <div className='contact-item'>
                        <Typography>
                            <span>
                              <i className='fa fa-envelope-o'></i> Email
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

import React from 'react';
import {Typography, Paper, Grid, Card, CardMedia, CardContent} from '@mui/material';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const Features = (props) => {
    return (
        <div id='features' className='text-center'>
            <Container>
                <Grid container spacing={3} justify='center'>
                    <Grid item xs={12}>
                        <Typography variant='h2'>ویژگی ها</Typography>
                    </Grid>
                    {props.data
                        ? props.data.map((d, i) => (
                            <Grid key={`${d.title}-${i}`} item xs={6} sm={3}>
                                <i className={d.icon}></i>
                                <Card>
                                    <CardMedia
                                        component='img'
                                        alt={d.title}
                                        height='140'
                                        image={d.image}
                                    />
                                    <CardContent>
                                        <Typography variant='h5'>{d.title}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                        : 'Loading...'}
                </Grid>
            </Container>
        </div>
    );
};

export default Features;

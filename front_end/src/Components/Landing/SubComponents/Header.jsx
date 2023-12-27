import React from 'react';
import { Typography, Container, Grid } from '@mui/material';
import ParticlesBg from 'particles-bg';

const Header = (props) => {
    return (
        <header id='header'>
            <div className='intro' style={{ position: 'relative' }}>
                <ParticlesBg type="circle" bg={{ zIndex: 0, position: "center", top: 0 }} />
                <div className='overlay' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <Container>
                        <Grid container justify="center">
                            <Grid item md={10}>
                                <div className='intro-text' style={{ zIndex: 0, position: 'relative', textAlign: 'center' }}>
                                    <Typography variant="h1" gutterBottom>
                                        {props.data ? props.data.title : 'Loading'}
                                        <span></span>
                                    </Typography>
                                    <Typography variant="body1" paragraph>
                                        {props.data ? props.data.paragraph : 'Loading'}
                                    </Typography>
                                </div>
                            </Grid>
                        </Grid>
                    </Container>
                </div>
            </div>
        </header>
    )
}

export default Header;

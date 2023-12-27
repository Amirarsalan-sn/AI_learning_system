import React, { useState, useEffect } from 'react';
import Footer from './SubComponents/Footer';
import Contact from "./SubComponents/Contact";
import Features from './SubComponents/Features';
import About from './SubComponents/About';
import {Box, Grid} from '@mui/material';
import SmoothScroll from 'smooth-scroll';
import JsonData from '../data/data.json'
import Header from "./SubComponents/Header";
import Container from "@mui/material/Container";

export const scroll = new SmoothScroll('a[href*="#"]', {
    speed: 1000,
    speedAsDuration: true,
});

const Landing = () => {
    const [landingPageData, setLandingPageData] = useState({})
    useEffect(() => {
        setLandingPageData(JsonData)
    }, [])

    return (
        <Box
            sx={{
                textAlign: 'center',
                backgroundColor: '#4A6572 ',
            }}
        >

            <Header data={landingPageData.Header}/>
            <Features data={landingPageData.Features} />
            <Box
                sx={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
            >
                <Grid>
                    <Grid>
                        <About data={landingPageData.About} />
                    </Grid>
                    <Grid>
                        <Contact data={landingPageData.Contact} />
                    </Grid>
                </Grid>
            </Box>
            <Footer />
        </Box>
    );
};

export default Landing;
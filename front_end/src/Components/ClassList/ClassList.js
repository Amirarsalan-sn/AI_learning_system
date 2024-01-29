
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Container,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    CircularProgress
} from '@mui/material';
import Alert from "@mui/material/Alert";

export default function ClassList() {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        const fetchClasses = async () => {
            setLoading(true);
            setError(null);
            const TOKEN = sessionStorage.getItem('token');

            try {
                const customConfig = {

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Token ${TOKEN}`

                    }
                };
                const response = await axios.get('http://localhost:8000/api/classes/',customConfig);
                setClasses(response.data);
                console.log(response.data)
                setLoading(false);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setError('Failed to load classes'); // Set a user-friendly error message
                setLoading(false);
            }
        };

        fetchClasses();
    }, []);

    const handleCardClick = (classId) => {
        navigate(`/dashboard/class/${classId}`); // Navigate to class details page
    };
    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading data</Alert>;


    return (<Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={4}>
                {classes.map((classItem) => (
                    <Grid item key={classItem.id} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '90%', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s', '&:hover': { transform: 'translateY(-6px)', cursor: 'pointer' } }}
                            onClick={() => handleCardClick(classItem.id)}
                        >
                            <CardMedia
                                component="img"
                                sx={{ pt: '40%' }}
                                image={classItem.imageUrl || "https://source.unsplash.com/random?classroom"} // Replace with your image property
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h4">
                                    {classItem.ClassName || "کلاس نمونه"}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small">نمایش</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}

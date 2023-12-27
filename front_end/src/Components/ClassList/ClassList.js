import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import * as React from "react";
import {useNavigate} from "react-router-dom";

const cards = [1,2,3,4,5];
export default function ClassList(){
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate("class/12")
        console.log("clicked")
        // Replace "/c" with your desired URL
    };
    return(
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={4}>

                {cards.map((card) => (
                    <Grid item key={card} xs={12} sm={6} md={4}>
                        <Card
                            sx={{ height: '90%', display: 'flex', flexDirection: 'column' ,
                                transition: 'transform 0.3s', // Add transition for elevation effect
                                '&:hover': {
                                    transform: 'translateY(-6px)', // Elevate on hover
                                    cursor: 'pointer', // Change cursor to pointer on hover

                                },
                                // boxShadow: "5px 5px"

                            }}
                            onClick={handleCardClick}
                        >
                            <CardMedia
                                component="div"
                                sx={{
                                    // 16:9
                                    pt: '56.25%',
                                }}
                                image="https://source.unsplash.com/random?wallpapers"
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h6" component="h4">
                                    کلاس نمونه
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
    )
}
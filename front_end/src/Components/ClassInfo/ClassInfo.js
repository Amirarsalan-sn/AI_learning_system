import {useLocation, useNavigate, useNavigation, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {CircularProgress, Typography} from "@mui/material";
import PaperListItem from "../PaperListItem/PaperListItem";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import * as React from "react";
import Divider from '@mui/material/Divider';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import NewDiscussion from '../Discussion/NewDiscussion'
import Alert from "@mui/material/Alert";
function ClassInfo() {
    const [classes, setClasses] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {pathname} = useLocation();
    const { classID } = useParams();
    const [data, setData] = useState({});
    const [dis, setDis] = useState({});
    const [ass, setAss] = useState({});

    useEffect(() => {
        const fetchClass = async () => {
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
                const response = await axios.get(`http://localhost:8000/api/classes/${classID}/`,customConfig);
                const response2 = await axios.get(`http://localhost:8000/api/classes/${classID}/exercise`,customConfig);
                const response3 = await axios.get(`http://localhost:8000/api/classes/${classID}/discussion`,customConfig);

                console.log(response2.data)
                console.log(response3.data)

                setData(response.data);
                setAss(response2.data);
                setDis(response3.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching classes:', error);
                setError('Failed to load classes'); // Set a user-friendly error message
                setLoading(false);
            }
        };

        fetchClass();
    }, []);

    const handleDiscClick = (disID) => {
        navigate(`/dashboard/class/${classID}/discussion/${disID}`)
        console.log("clicked")
        // Replace "/c" with your desired URL
    };
    const handleExClick = (assID) => {
        navigate(`/dashboard/class/${classID}/assignment/${assID}`)
        console.log("clicked")
        // Replace "/c" with your desired URL
    };
    // const [data, setData] = useState({
    //     id: 12,
    //     title: "salam",
    //     body: "some thing",
    //     responses : [{id: 3, body: "x"}, {id: 4, body: "x"}, {id: 5, body: "x"}, {id: 6, body: "x"}, {id: 7, body: "x"}],
    //     hws: [{id: 3, body: "x" , date:" 12/2/80",title:"تمرین اول"},{id: 3, body: "x" , date:" 12/2/80",title:"تمرین دوم"},{id: 3, body: "x" , date:" 12/2/80",title:"تمرین سوم"},{id: 3, body: "x" , date:" 12/2/80",title:"تمرین چهارم"}],
    //     discussions : [{id: 3, body: "در سال ۱۹۵۰ در نوشته‌ای به نام «محاسبات ماشینی و هوشمندی» مطرح شد. در این آزمون شرایطی فراهم می‌شود که شخصی با ماشینی تعامل برقرار کند" ,
    //         date:" 12/2/80",title:"مشکل تمرین اول"},
    //         {id: 3, body: "در سال ۱۹۵۰ در نوشته‌ای به نام «محاسبات ماشینی و هوشمندی» مطرح شد. در این آزمون شرایطی فراهم می‌شود که شخصی با ماشینی تعامل برقرار کند" , date:" 12/2/80",title:"الگوریتم سرچ"},
    //         {id: 3, body: "در سال ۱۹۵۰ در نوشته‌ای به نام «محاسبات ماشینی و هوشمندی» مطرح شد. در این آزمون شرایطی فراهم می‌شود که شخصی با ماشینی تعامل برقرار کند" , date:" 12/2/80",title:"میانترم"},
    //         {id: 3, body: "در سال ۱۹۵۰ در نوشته‌ای به نام «محاسبات ماشینی و هوشمندی» مطرح شد. در این آزمون شرایطی فراهم می‌شود که شخصی با ماشینی تعامل برقرار کند" , date:" 12/2/80",title:"چی بگم؟"}]
    // });


    if (loading) return <CircularProgress />;
    if (error) return <Alert severity="error">Error loading data</Alert>;

    return <>
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom > {data.ClassName}</Typography>
                        <Divider></Divider>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell>تعداد دانشجویان</TableCell>
                                    <TableCell>{data.students_list.length}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>استاد</TableCell>
                                    <TableCell>{data.professor.last_name}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                <Grid item xs={6}>

                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column',
                        transition: 'transform 0.3s',
                        '&:hover': {
                            transform: 'translateY(-6px)',
                            cursor: 'pointer', // Change cursor to pointer on hover

                        },
                    }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom >تالار گفتگو</Typography>
                        {

                            dis.map(({id, question,created_at,title}) => {
                                return <PaperListItem id={id} body={question} date={created_at} title={title} onclick={() => handleDiscClick(id)}/>
                            })
                        }
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column',
                        transition: 'transform 0.3s', // Add transition for elevation effect
                        '&:hover': {
                            transform: 'translateY(-6px)', // Elevate on hover
                            cursor: 'pointer', // Change cursor to pointer on hover

                        },
                    }}
                    >
                        <Typography component="h2" variant="h6" color="primary" gutterBottom >تمرین ها</Typography>
                        {
                            ass.map(({id,created_at,title}) => {
                                return <PaperListItem id={id} date={created_at} title={title} onclick={() => handleExClick(id)}/>
                            })
                        }
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}
                    >
                        <NewDiscussion/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </>

}

export default ClassInfo;
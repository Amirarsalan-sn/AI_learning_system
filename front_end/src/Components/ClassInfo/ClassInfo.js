import {useLocation, useNavigate, useNavigation, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {Typography} from "@mui/material";
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

function ClassInfo() {
    const [data, setData] = useState({

        id: 12,
        title: "salam",
        body: "some thing",
        responses : [{id: 3, body: "x"}, {id: 4, body: "x"}, {id: 5, body: "x"}, {id: 6, body: "x"}, {id: 7, body: "x"}],
        hws: [{id: 3, body: "x" , date:" 12/2/80",title:"تمرین اول"},{id: 3, body: "x" , date:" 12/2/80",title:"تمرین دوم"},{id: 3, body: "x" , date:" 12/2/80",title:"تمرین سوم"},{id: 3, body: "x" , date:" 12/2/80",title:"تمرین چهارم"}],
        discussions : [{id: 3, body: "در سال ۱۹۵۰ در نوشته‌ای به نام «محاسبات ماشینی و هوشمندی» مطرح شد. در این آزمون شرایطی فراهم می‌شود که شخصی با ماشینی تعامل برقرار کند" ,
            date:" 12/2/80",title:"مشکل تمرین اول"},
            {id: 3, body: "در سال ۱۹۵۰ در نوشته‌ای به نام «محاسبات ماشینی و هوشمندی» مطرح شد. در این آزمون شرایطی فراهم می‌شود که شخصی با ماشینی تعامل برقرار کند" , date:" 12/2/80",title:"الگوریتم سرچ"},
            {id: 3, body: "در سال ۱۹۵۰ در نوشته‌ای به نام «محاسبات ماشینی و هوشمندی» مطرح شد. در این آزمون شرایطی فراهم می‌شود که شخصی با ماشینی تعامل برقرار کند" , date:" 12/2/80",title:"میانترم"},
            {id: 3, body: "در سال ۱۹۵۰ در نوشته‌ای به نام «محاسبات ماشینی و هوشمندی» مطرح شد. در این آزمون شرایطی فراهم می‌شود که شخصی با ماشینی تعامل برقرار کند" , date:" 12/2/80",title:"چی بگم؟"}]
    });


    const {pathname} = useLocation();
    const pathParams = useParams();

    // console.log(b);
    //
    //
    // useEffect(() => {
    //     const url = 'http://localhost/rest/of/path';
    //     axios.get(url).then((res) => {
    //             setData(res);
    //         }
    //     ).catch(
    //         () => {
    //
    //         }
    //     )
    // }, [pathParams]);


    return <>
        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom >  هوش مصنوعی پاییز 1402</Typography>
                        <Divider></Divider>
                        <Table size="small">
                            <TableBody>
                                <TableRow>
                                    <TableCell>تعداد دانشجویان</TableCell>
                                    <TableCell>32</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>استاد</TableCell>
                                    <TableCell>مهران علیدوست نیا</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>

                <Grid item xs={6}>

                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom >تالار گفتگو</Typography>
                        {
                            data.discussions.map(({id, body,date,title}) => {
                                return <PaperListItem id={id} body={body} date={date} title={title}/>
                            })
                        }
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom >تمرین ها</Typography>
                        {
                            data.hws.map(({id,date,title}) => {
                                return <PaperListItem id={id} date={date} title={title}/>
                            })
                        }
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    </>

}

export default ClassInfo;
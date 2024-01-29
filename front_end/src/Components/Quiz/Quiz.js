import React, {useCallback, useEffect, useState} from "react";
import LinearProgress, {LinearProgressProps} from '@mui/material/LinearProgress';
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ButtonBar from "../ButtonBar/ButtonBar";
import Typography from '@mui/material/Typography';
import axios from "axios";
import useGet from "../../Hooks/useGet";
function numberToPersianText(number) {
    const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

    const numStr = number.toString();
    let persianText = "";

    for (let i = 0; i < numStr.length; i++) {
        const digit = parseInt(numStr.charAt(i));
        persianText += persianDigits[digit];
    }

    return persianText;
}

const currentOptions = [
    {id: 1, option: "به شدت موافق"},
    {id: 2, option: "موافق"},
    {id: 3, option: "مخالف"},
    {id: 4, option: "به شدت مخالف"},
    {id: 5, option: "غیرممکن یا ناموجود"}
]
function Title(props) {
    return (
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
            {props.children}
        </Typography>
    );
};


function BlockInfo({data}) {
    return (<>
        <Title>{data.title}</Title>
        <Typography>
            {data.description}
        </Typography>
    </>);

}


const buttonBarStyle = {
    position: "sticky",
    bottom: "0",
};

function Quiz() {

    const [currentBlock, setCurrentBlock] = useState(1)
    const {data, error} = useGet(
        `http://localhost:8000/api/blocks/${currentBlock}/`,
        sessionStorage.getItem("token")
    );

    const [submitcheck, setSubmitcheck] = useState(null);
    const [error2, setError2] = useState({});


    useEffect(() => {
        const TOKEN = sessionStorage.getItem("token");
        axios
            .get("http://localhost:8000/api/submitbulk", {
                headers: { Authorization: `Token ${TOKEN}` },
            }).then((ans) => {
            setSubmitcheck(ans.data);
        }).catch((e) => {
            setError2(e);
        });
    }, []);
    const [answers, setAnswers] = useState({});
    const handleAnswerSelect = (questionId, selectedOption) => {
        setAnswers((prevState) => {
            let newState = Object.assign({}, prevState);
            newState[questionId] = selectedOption;
            return newState;
        });
    };

    const handleSubmit = function () {

        const TOKEN = sessionStorage.getItem('token');

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': `Token ${TOKEN}`,
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                answers: answers
            })
        };
        fetch('http://127.0.0.1:8000/api/submitbulk/', requestOptions)
            .then(response => response.json())
            .then(data => setAnswers({}));
    };
    const handleNext = () => {
        if (currentBlock < 9) {
            setCurrentBlock(currentBlock + 1);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
    };

    const handlePrevious = () => {
        if (currentBlock > 1) {
            setCurrentBlock(currentBlock - 1);
            window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }
    };

    return (<Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
                overflowY: 'auto',
            }}
        >
            <Toolbar/>
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3}>
                    {submitcheck === null || data.number === undefined? (
                       <div> loading </div>
                    ) : submitcheck.has_submitted === 0 ? (<>
                        <Grid item xs={12}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',

                                }}
                            >
                                <Typography variant="h5" mt={3} mb={3}>

                                    بلوک {numberToPersianText(data.number)} از {numberToPersianText(9)}</Typography>
                                <LinearProgress variant="determinate" value={Number((data.number / 9) * 100)}/>
                                <BlockInfo data={data}/>
                            </Paper>
                        </Grid>

                        {data.questions.map(function (q) {
                            return (<>
                                <Box mb={2} />
                                <Grid item xs={12}>
                                    <Paper
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',

                                        }}
                                    >
                                        <p>{q.text}</p>
                                        <ul className="list-group text-start">
                                            {currentOptions.map(function (o) {
                                                return answers[q.id] === o.id ?
                                                    <button onClick={() => console.log("already")}
                                                            className="list-group-item list-group-item-action"
                                                            style={{
                                                                textAlign: "right",
                                                                background: "grey"
                                                            }}>{o.option}</button> :
                                                    <button onClick={() => handleAnswerSelect(q.id, o.id)}
                                                            className="list-group-item list-group-item-action"
                                                            style={{textAlign: "right"}}>{o.option}</button>
                                            })}
                                        </ul>
                                    </Paper>
                                </Grid>
                            </>);
                        })}
                        <Box mb={2} />
                        <Grid item xs={12} style={buttonBarStyle}>
                            <Paper
                                sx={{
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <ButtonBar
                                    text1={'قبلی'}
                                    text2={'بعدی'}
                                    text3={currentBlock === 9 ? "ثبت" : "بعدی" }
                                    func1={handlePrevious}
                                    func2={handleNext}
                                    func3={currentBlock === 9 ? handleSubmit : handleNext}
                                    isVisable1={currentBlock !== 1}
                                    isVisable2={false}
                                    isVisable3={true}
                                />
                            </Paper>
                        </Grid>
                    </>) : (<Grid item xs={12}>
                        <Paper
                            sx={{
                                p: 2,
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Title>
                                با تشکر از همکاری شما
                            </Title>
                            <Typography>
                                پاسخ شما با موفقیت ثبت شده است.
                            </Typography>
                        </Paper>
                    </Grid>)}
                </Grid>
            </Container>
        </Box>
    );
}
export default Quiz;
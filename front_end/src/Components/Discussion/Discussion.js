import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Typography, TextField, Button, Snackbar, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import {useParams} from "react-router-dom";
const UserInfoBox = ({ username, time }) => (
    <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p={1}
        mb={2}
        width="100%"
        bgcolor="lightgrey"
    >
        <Typography variant="body2">{username}</Typography>
        <Box display="flex" alignItems="center">
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2" style={{ marginLeft: "5px" }}>
                {time}
            </Typography>
        </Box>
    </Box>
);
const QuestionBox = ({ username, time, title, question }) => (
    <Box
        border={1}
        borderRadius={4}
        borderColor="grey.300"
        p={2}
        mb={2}
        alignSelf="flex-end"
        bgcolor="lightblue">
        <UserInfoBox username={username} time={time} />
        <Typography variant="h4">{title}</Typography>
        <Typography>{question}</Typography>
    </Box>
);
const Reply = ({ id, body, author, time }) => (
    <Box
        key={id}
        border={1}
        borderRadius={4}
        borderColor="grey.300"
        p={2}
        mb={2}
        width="100%"
        alignSelf="flex-end"
        bgcolor="lightyellow"
    >
        <UserInfoBox username={author} time={time} />
        <Typography variant="body1">{body}</Typography>
    </Box>
);

const ReplyList = ({ replies }) => (
    <Box mb={2} alignSelf="flex-end" width="100%">
        {replies.map(({ id, body, author, created_at }) => (
            <Reply key={id} id={id} body={body} author={author.email} time={created_at} />
        ))}
    </Box>
);
const AddReply = ({ onReplySubmit }) => {
    const [newReply, setNewReply] = useState("");
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleReplySubmit = () => {
        if (newReply.split(/\s+/).length > 100) {
            setError("متن پاسخ باید کوتاه تر باشد.");
            setSnackbarOpen(true);
            return;
        }

        onReplySubmit({ body: newReply })
        setNewReply("");
    };

    return (
        <Box
            border={1}
            borderRadius={4}
            borderColor="grey.300"
            p={2}
            mb={2}
            alignSelf="flex-end"
        >
            <Typography variant="h6">اضافه کردن پاسخ</Typography>
            <TextField
                label="پاسخ شما"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={newReply}
                onChange={(e) => setNewReply(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleReplySubmit}>
                ارسال پاسخ
            </Button>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={error} />
        </Box>
    );
};
const Discussion = () => {
    const { classId, discussionId } = useParams();
    const [discussion, setDiscussion] = useState(null);
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [counter, setCounter] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/classes/${classId}/discussion/${discussionId}`);
                setDiscussion(response.data);
            } catch (error) {
                console.error("Error fetching data from the backend", error);
                setSnackbarOpen(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [classId, discussionId]);
    const handleReplySubmit = async (reply) => {
        try {
            const TOKEN = sessionStorage.getItem('token');
            const payload = JSON.stringify({
                classId: discussion.classId,
                discussionId: discussion.id,
                body: reply.body,
            });
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN}`
                }
            };
            const { data } = await axios.post(`http://localhost:8000/api/classes/${classId}/discussion/${discussionId}`, payload, customConfig);

            if(data.status === 200) {
                setCounter(!counter);
            }else {
                setError("جواب ارسال نشد.");
                setSnackbarOpen(true);
            }

        } catch (error) {
            console.error("Error submitting reply", error);
            setSnackbarOpen(true);
        }
    };
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            {isLoading ? (
                <Box textAlign="center">
                    <CircularProgress />
                    <Typography variant="body2">منتظر بمانید...</Typography>
                </Box>
            ) : discussion && (
                <Box width="75%" textAlign="left">
                    <QuestionBox username={discussion.creator.username} time={discussion.created_at} title={discussion.title} question={discussion.question} />
                    <ReplyList replies={discussion.replies_list} />
                    <AddReply onReplySubmit={handleReplySubmit}/>
                </Box>
            )};
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={error} />
        </Box>
    );
};

export default Discussion;

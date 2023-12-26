import React, { useState, useEffect } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import { Typography, TextField, Button, Snackbar, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
        {replies.map(({ id, body, author, time }) => (
            <Reply key={id} id={id} body={body} author={author} time={time} />
        ))}
    </Box>
);
const AddQuestion = ({ onQuestionSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleQuestionSubmit = () => {
        // Validate the fields, and if valid, call the onQuestionSubmit function
        if (title.trim() === "" || content.trim() === "") {
            // You can show an error message or handle validation as needed
            return;
        }

        onQuestionSubmit({ title, content });
        setTitle("");
        setContent("");
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
            <Typography variant="h6">اضافه کردن سوال</Typography>
            <TextField
                label="عنوان سوال"
                variant="outlined"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
                label="محتوای سوال"
                variant="outlined"
                fullWidth
                multiline
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleQuestionSubmit}>
                ارسال سوال
            </Button>
        </Box>
    );
};
const Discussion = () => {
    const [discussion, setDiscussion] = useState(null);
    const [newReply, setNewReply] = useState("");
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleReplySubmit = () => {
        if (newReply.split(/\s+/).length > 100) {
            setError("Reply should be 100 words or less.");
            setSnackbarOpen(true);
            return;
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            setTimeout(async () => {
                const staticData = {
                    id: 12,
                    username: "محمد",
                    time: "2 ساعت پیش",
                    title: "الگوریتم BFS",
                    question: "این الگوریتم چگونه کار می کند؟",
                    replies: [
                        { id: 1, body: "منم بلد نیستم.", author: "علی", time: "1 ساعت پیش" },
                        { id: 2, body: "از استاد بپرسیم بهتره.", author: "رضا", time: "نیم ساعت پیش" },
                    ],
                };

                try {
                    setDiscussion(staticData);
                } catch (error) {
                    setError("Error fetching data from the backend");
                    setSnackbarOpen(true);
                } finally {
                    setIsLoading(false);
                }
            }, 2000);
        };

        fetchData();
    }, []);

    return (
        <Box
            display="flex"
            justifyContent="center" // Center-align the content
            alignItems="center"
            height="100vh"
        >
            {isLoading ? (
                <Box textAlign="center">
                    <CircularProgress />
                    <Typography variant="body2">Loading...</Typography>
                </Box>
            ) : (
                <Box width="75%" textAlign="left">
                    <Box
                        border={1}
                        borderRadius={4}
                        borderColor="grey.300"
                        p={2}
                        mb={2}
                        alignSelf="flex-end"
                        bgcolor="lightblue"
                    >
                        <UserInfoBox username={discussion.username} time={discussion.time} />
                        <Typography variant="h4">{discussion.title}</Typography>
                        <Typography>{discussion.question}</Typography>
                    </Box>
                    <ReplyList replies={discussion.replies} />
                    <Box
                        alignSelf="flex-end"
                        width="100%"
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
                    </Box>
                </Box>
            )}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={error}
                severity="error"
            />
        </Box>
    );
};

export default Discussion;

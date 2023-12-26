import React, {useState} from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import {Button, Snackbar, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const AddQuestion = ({ onQuestionSubmit }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();
    const handleQuestionSubmit = () => {
        if (title.trim() === "" || content.trim() === "") {
            setError("متن عنوان و سوال باید وارد شود.");
            setSnackbarOpen(true);
            return;
        }
        if (title.trim().split(/\s+/).length > 50) {
            setError("متن عنوان باید کوتاه تر باشد.");
            setSnackbarOpen(true);
            return;
        }
        if (content.trim().split(/\s+/).length > 100) {
            setError("متن سوال باید کوتاه تر باشد.");
            setSnackbarOpen(true);
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
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)} message={error} />
        </Box>
    );
};

const NewDiscussion = () => {
    const [discussion, setDiscussion] = useState(null);
    const [error, setError] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleQuestionSubmit = async (question) => {
        try {
            const TOKEN = sessionStorage.getItem('token');
            const payload = JSON.stringify({
                classId: discussion.classId,
                title: question.title,
                content: question.content,
            });
            const customConfig = {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${TOKEN}`
                }
            };
            const { data } = await axios.post("http://localhost:8000/dashboard/class/:classId/discussion/",payload, customConfig);
            if (data.status === 200) {
                navigate(data.discussionId);
            }else {
                setError("سوال ارسال نشد.");
                setSnackbarOpen(true);
            }

        } catch (error) {
            console.error("Error submitting question", error);
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
            height="80vh"
        >
            <AddQuestion onQuestionSubmit={handleQuestionSubmit} />
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={error} />
        </Box>
    );
};

export default NewDiscussion;
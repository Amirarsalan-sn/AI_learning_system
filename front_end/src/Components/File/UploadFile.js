import React, { useState } from 'react';
import axios from 'axios';
import { Button, Input, Typography } from '@mui/material';
import Box from "@mui/material/Box";
import {useNavigate} from "react-router-dom";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

function UploadFile() {
    const [fileProperties, setFileProperties] = useState({
        file: null,
        fileType: null,
        fileName: null,
    });
    const [isUploadAction, setUploadAction] = useState(false);
    const navigate = useNavigate();

    const setFileProperty = (file, fileType, fileName) => {
        setFileProperties({ file, fileType, fileName });
    };

    const clearFileProperty = () => {
        setFileProperties({ file: null, fileType: null, fileName: null });
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFileProperty(selectedFile, selectedFile.type, selectedFile.name);
        } else {
            clearFileProperty();
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();
        setUploadAction(true);

        try {
            await uploadFile(fileProperties.file);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const uploadFile = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        const TOKEN = sessionStorage.getItem('token');
        const payload = JSON.stringify({
            file: formData,
        });
        const customConfig = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${TOKEN}`
            }
        };
        const apiUrl = 'http://localhost:8000/dashboard/class/:classId/assignment/';

        try {
            const response = await axios.post(apiUrl, formData);
            if(response.status === 200){
                navigate(response.assignmentId);
            }
            console.log('Response:', response.data);
        } catch (error) {
            throw error;
        }
    };

    return (
        <>
            <Paper sx={{p: 2, display: 'flex', flexDirection: 'column'}}>
                <Typography component="h2" variant="h6" color="primary" gutterBottom >تمرین اول</Typography>
                <Divider></Divider>
                <Table size="small">
                    <TableBody>
                        <TableRow>
                            <TableCell>تاریخ پایان</TableCell>
                            <TableCell>12/2/1403</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>توضیحات</TableCell>
                            <TableCell>لطفا فایل خود را با فرمت pdf آپلود کنید.</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            <form onSubmit={handleUpload}>
                <Typography variant="h6" color="primary">
                    آپلود تکلیف
                </Typography>
                <Box id="error-message"></Box>
                <Input
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif, .pdf, .docx"
                    onChange={handleFileChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary">
                    آپلود
                </Button>
            </form>

            {isUploadAction && fileProperties.fileType && (
                <Box className="file-details">
                    <Typography variant="h6">Preview :</Typography>
                    {fileProperties.fileName && (
                        <Typography variant="body1">نام فایل: {fileProperties.fileName}</Typography>
                    )}
                </Box>
            )}
            <div id="file-preview"></div>
        </>
    );
}

export default UploadFile;

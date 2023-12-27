import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { Button, Typography } from '@mui/material';
import Box from "@mui/material/Box";

function FileDownload() {
    const [assignmentId, setAssignmentId] = useState(null);

    useEffect(() => {
        // Fetch assignmentId from the backend or set it dynamically
        const fetchAssignmentId = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/getAssignmentId'); // Replace with your actual API endpoint
                setAssignmentId(response.data.assignmentId);
            } catch (error) {
                console.error('Error fetching assignmentId:', error);
            }
        };

        fetchAssignmentId();
    }, []);

    const handleDownload = async () => {
        if (assignmentId) {
            const downloadUrl = `http://localhost:8000/dashboard/class/:classId/assignment/${assignmentId}`;

            try {
                const response = await axios.get(downloadUrl, { responseType: 'blob' });
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'downloaded_file');
                document.body.appendChild(link);
                link.click();
            } catch (error) {
                console.error('Error downloading file:', error);
            }
        }
    };

    return (
        <div>
            <Box className="file-details">
                <Typography variant="h6"> دانلود :</Typography>
                <Button onClick={handleDownload} variant="outlined" color="primary">
                    دانلود فایل
                </Button>
            </Box>
        </div>
    );
}

export default FileDownload;
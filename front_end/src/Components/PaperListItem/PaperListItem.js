import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
const PaperListItem = ({ id, title, body, date }) => {
    return (
        <Paper elevation={3} sx={{ p: 2, mb: 2, borderRadius: 2 }}>
            <Typography variant="h6" mb={1} fontWeight="bold">
                {title}
            </Typography>
            {body ? (
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Typography variant="body1" flex={2} color="text.secondary">
                        {body}
                    </Typography>
                    <Typography variant="body2" flex={1} textAlign="right" color="text.secondary">
                        {date}
                    </Typography>
                </Box>
            ) : (
                <Typography variant="body2" color="text.secondary">
                    {date}
                </Typography>
            )}
        </Paper>
    );
};
export default PaperListItem;
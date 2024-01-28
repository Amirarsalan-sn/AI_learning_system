
import TreeWrapper from "../Graph/TreeWrapper";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Paper, Button, Select, MenuItem, CircularProgress } from '@mui/material';
import axios from 'axios';
function AlgoView() {
    const exMatrix = [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 0],
        [0, 1, 0, 0]
    ];
    const navigate = useNavigate();
    const [algorithm, setAlgorithm] = useState('bfs'); // or 'dfs'
    const [adjacencyMatrix, setAdjacencyMatrix] = useState(exMatrix);
    const [sequence, setSequence] = useState([0,1,2,3]);
    const [loading, setLoading] = useState(false);

    const fetchNewInstance = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/api/your-endpoint', { params: { algorithm } });
            setAdjacencyMatrix(response.data.adjacencyMatrix);
            setSequence(response.data.sequence);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleAlgorithmChange = (event) => {
        setAlgorithm(event.target.value);
    };
    return (
        <>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <Select
                                value={algorithm}
                                onChange={handleAlgorithmChange}
                                sx={{ mb: 2 }}
                            >
                                <MenuItem value="bfs">Breadth-First Search (BFS)</MenuItem>
                                <MenuItem value="dfs">Depth-First Search (DFS)</MenuItem>
                            </Select>
                            <Button variant="contained" onClick={fetchNewInstance}>
                                ایجاد نمونه جدید
                            </Button>
                            {loading && <CircularProgress />}
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper sx={{ p: 2 }}>
                            {!loading && adjacencyMatrix.length > 0 && (
                                <TreeWrapper
                                    adjacencyMatrix={adjacencyMatrix}
                                    visitSeq={sequence}
                                />
                            )}
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    );


}

export default AlgoView;
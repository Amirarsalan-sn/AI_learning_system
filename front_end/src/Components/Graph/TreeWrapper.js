import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tree from './Tree'; // Assuming Tree component is in the same directory

export default function TreeWrapper() {

    const exMatrix = [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [1, 0, 0, 0],
        [0, 1, 0, 0]
    ];
    const [adjacencyMatrix, setAdjacencyMatrix] = useState(exMatrix);
    const [visitSeq, setVisitSeq] = useState([0,1,2,3]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     setLoading(true);
    //     setError(null);
    //     axios.get('/your-endpoint-url')
    //         .then(response => {
    //             setAdjacencyMatrix(response.data.adjacencyMatrix);
    //             setVisitSeq(response.data.visitSeq);
    //             setCurrentIndex(0);
    //             setLoading(false);
    //
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data: ", error);
    //             setError(error);
    //             setLoading(false);
    //         });
    // }, []);
    const handleNext = () => {
        if (currentIndex < visitSeq.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };
    // if (loading) return <CircularProgress />;
    // if (error) return <Alert severity="error">Error loading data</Alert>;



    return (
        <div>
            <Tree
                adjacencyMatrix={adjacencyMatrix}
                visitingNode={visitSeq[currentIndex]}
            />
            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={currentIndex === visitSeq.length - 1}
                >
                    Next
                </Button>
                <Button
                    variant="contained"
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    style={{ marginRight: 10 }}
                >
                    Previous
                </Button>
            </div>
        </div>
    );
}

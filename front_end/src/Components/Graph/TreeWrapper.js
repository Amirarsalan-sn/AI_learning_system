import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Alert from '@mui/material/Alert';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tree from './Tree'; // Assuming Tree component is in the same directory

export default function TreeWrapper({adjacencyMatrix , visitSeq}) {


    const [currentIndex, setCurrentIndex] = useState(0);

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
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    style={{ marginRight: 10 }}
                >
                    قبلی
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    disabled={currentIndex === visitSeq.length - 1}
                >
                    بعدی
                </Button>

            </div>
        </div>
    );
}

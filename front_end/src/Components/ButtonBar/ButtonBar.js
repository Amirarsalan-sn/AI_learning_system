import React, {useEffect} from 'react';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    toolbar: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));

function ButtonBar({ func1, func2, func3, text1, text2, text3 , isVisable1 , isVisable2 , isVisable3}) {
    const classes = useStyles();

    return (
        <Toolbar className={classes.toolbar}>
            <Button variant="contained" onClick={func1} style={{ visibility: isVisable1 ? 'visible' : 'hidden' }}>
                {text1}
            </Button>
            <Button variant="contained" onClick={func2} style={{ visibility: isVisable2 ? 'visible' : 'hidden' }}>
                {text2}
            </Button>
            <Button variant="contained" onClick={func3} style={{ visibility: isVisable3 ? 'visible' : 'hidden' }}>
                {text3}
            </Button>
        </Toolbar>

    );
}

export default ButtonBar;


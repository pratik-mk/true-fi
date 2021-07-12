import React from 'react';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

interface Props {

}

export const SignUp: React.FC<Props> = (props) => {
    return (
        <>
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                        >
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            True-Fi
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <h1>Sign Up</h1>
            <div>
                <TextField id="outlined-basic" label="Email" variant="outlined" />
            </div>
            <div>
                <TextField id="outlined-basic" label="Password" variant="outlined" />
            </div>
            <div>
                <TextField id="standard-error-helper-text" label="Confirm Password" variant="outlined" />
            </div><div>
                <Button variant="contained" color="primary">Submit</Button>
            </div>
        </>
    );
};
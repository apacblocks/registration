import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Meteor } from 'meteor/meteor'
import TopNav from './Shared/TopNav';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SnackbarWrapper from './Shared/SnackbarWrapper';

const useStyles = makeStyles(theme => ({
    root: {
        position: 'fixed',
        bottom: 80,
        right: theme.spacing(2),
    },
    footer: {
        top: 'auto',
        bottom: 0,
    },
}));

export default function Login(props) {
    if (Meteor.user()) {
        props.history.push('/profile');
    }
    const classes = useStyles();
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [snackbar, setSnackbar] = useState({ open: false, variant: 'success', message: '' });
    const topNavStart = {
        icon: (<SupervisedUserCircleIcon />),
        title: "Login",
        func: () => {
            props.history.push('/welcome')
        }
    }

    function login() {
        if (userName == undefined || password == undefined) {
            setSnackbar({
                ...snackbar,
                ...{ open: true, variant: "error", message: 'fields cant be empty' }
            });

            setTimeout(() => {
                setSnackbar({ ...snackbar, ['open']: false })
            }, 2000);

            return
        }
        
        Meteor.loginWithPassword(userName, password, (err) => {
            if (!err) {
                props.history.push('/profile');
            }
            else {
                setSnackbar({
                    ...snackbar,
                    ...{ open: true, variant: "error", message: err.message }
                });

                setTimeout(() => {
                    setSnackbar({ ...snackbar, ['open']: false })
                }, 2000);
            }
        })
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <TopNav topNavStart={topNavStart} />
            <Toolbar id="back-to-top-anchor" />
            <Container>
                <Box my={3} mx={1}>
                    <TextField
                        id="standard-full-width-uname"
                        label="BTC address or Email"
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setUserName(event.target.value) }}
                    />
                    <TextField
                        id="standard-full-width-pw"
                        type="password"
                        label="Password"
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setPassword(event.target.value) }}
                    />
                    <Button style={{ marginTop: 15 }} variant="contained" color="primary" onClick={() => { login() }}>Login</Button>
                </Box>
                <SnackbarWrapper
                    open={snackbar.open}
                    variant={snackbar.variant}
                    message={snackbar.message}
                    className={classes.margin}
                />
            </Container>
        </React.Fragment>
    );
}

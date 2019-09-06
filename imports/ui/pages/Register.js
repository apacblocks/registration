import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'

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

export default function Reg(props) {
    const classes = useStyles();
    const [userName, setUserName] = useState();
    const [telName, setTelName] = useState();
    const [email, setEmail] = useState();
    const [btc, setBtc] = useState();
    const [password, setPassword] = useState();
    const [cPassword, setCPassword] = useState();
    const code = props.location.state.code;

    function register() {
        if (userName == undefined || telName == undefined || email == undefined || password == undefined || btc == undefined || code == undefined) {
            alert("Fields cant be empty")
            return
        }
        if (password.length < 6) {
            alert("password needs to have at least 6 characters!");
            return
        }
        if (password != cPassword) {
            alert("password not match!");
            return
        }
        Accounts.createUser({
            username: userName,
            email: email,
            password: password,
            profile: {
                btcAddress: btc,
                telegram: telName,
                balance: 1000,
                invitedBy: code
            }
        }, (err) => {
            if (!err) {
                console.log('success');
                alert("Account created!")
                props.history.push('/')
            } else {
                console.log(err.reason);
                alert(err.reason)
            }
        })
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar>
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="go back"
                        onClick={() => window.history.back()}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography variant="h6">APAC Blocks</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <Container style={{ minHeight: '100vh' }}>
                <Box my={2}>
                    <TextField
                        id="standard-full-width-user"
                        label="Username"
                        style={{ margin: 8 }}
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setUserName(event.target.value) }}
                    />
                    <TextField
                        id="standard-full-width-tel"
                        label="Telegram Username"
                        style={{ margin: 8 }}
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setTelName(event.target.value) }}
                    />
                    <TextField
                        id="standard-full-width-email"
                        type="email"
                        label="Email"
                        style={{ margin: 8 }}
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setEmail(event.target.value) }}
                    />
                    <TextField
                        id="standard-full-width-btc"
                        label="BTC address"
                        style={{ margin: 8 }}
                        placeholder=""
                        helperText="DO NOT lose your private key for this address :)"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setBtc(event.target.value) }}
                    />
                    <TextField
                        id="standard-full-width-pw"
                        type="password"
                        label="Password"
                        style={{ margin: 8 }}
                        placeholder=""
                        helperText="must be 6 or more characters long!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setPassword(event.target.value) }}
                    />
                    <TextField
                        id="standard-full-width-cpw"
                        type="password"
                        label="Confirm Password"
                        style={{ margin: 8 }}
                        placeholder=""
                        helperText="Enter password again"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={() => { setCPassword(event.target.value) }}
                    />
                    <Button style={{ marginTop: 10 }} variant="contained" color="primary" onClick={() => { register() }}>Submit</Button>
                </Box>
            </Container>
        </React.Fragment>
    );
}

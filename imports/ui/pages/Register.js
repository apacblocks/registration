import React from 'react';
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

export default function Login(props) {
    const classes = useStyles();

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
                    <Typography variant="h6">APAC Block</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <Container style={{ minHeight: '100vh' }}>
                <Box my={2}>
                    <TextField
                        id="standard-full-width"
                        label="Name"
                        style={{ margin: 8 }}
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Telegram Username"
                        style={{ margin: 8 }}
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Email"
                        style={{ margin: 8 }}
                        placeholder=""
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Password"
                        style={{ margin: 8 }}
                        placeholder=""
                        helperText="must be 6 or more characters long!"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        id="standard-full-width"
                        label="Confirm Password"
                        style={{ margin: 8 }}
                        placeholder=""
                        helperText="Enter password again"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <Button style={{ marginTop: 10 }} variant="contained" color="primary" onClick={() => { window.history.back() }}>Submit</Button>
                </Box>
            </Container>
        </React.Fragment>
    );
}

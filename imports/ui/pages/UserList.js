import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { Meteor } from 'meteor/meteor'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withTracker } from 'meteor/react-meteor-data';

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

function Login(props) {
    const classes = useStyles();

    function userJoinTime(user) {
        if (user.createdAt == undefined) {
            return "Loading"
        }
        else {
            return user.createdAt.toString()

        }
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
                    <Typography variant="h6">APAC Block</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <Container style={{ minHeight: '100vh' }}>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>membership number</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell align="right">Join Time</TableCell>
                            <TableCell align="right">invitedBy</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.users.map((user, index) => (
                            <TableRow key={user.username}>
                                <TableCell>{index}</TableCell>
                                <TableCell component="th" scope="row">
                                    {user.profile.realName}
                                </TableCell>
                                <TableCell align="right">{userJoinTime(user)}</TableCell>
                                <TableCell align="right">{user.profile.invitedBy}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Container>
        </React.Fragment>
    );
}

export default withTracker(() => {
    Meteor.subscribe('userlist');
    return {
        users: Meteor.users.find({},{sort: {createdAt: 1}}).fetch(),
    };
})(Login);
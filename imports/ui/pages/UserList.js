import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Meteor } from 'meteor/meteor'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withTracker } from 'meteor/react-meteor-data';
import BottomNav from './Shared/BottomNav';
import TopNav from './Shared/TopNav';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

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
    const topNavStart = {
        icon: (<SupervisedUserCircleIcon />),
        title: "Users",
        func: () => {
            props.history.push('/welcome')
        }
    }

    function userJoinTime(user) {
        if (user.createdAt == undefined) {
            return "Loading"
        }
        else {
            return user.createdAt.toString()

        }
    }

    if (props.ready){
        function searchUser(id) {
            props.users.forEach((user) => {
                if (user._id == id) {
                    console.log(user.profile.realName)
                    return user.profile.realName
                }
            })
        }
        return (
            <React.Fragment>
                <CssBaseline />
                <TopNav topNavStart={topNavStart} />
                <Toolbar id="back-to-top-anchor" />
                <Container style={{ minHeight: '100vh', marginBottom: '80px' }}>

                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Membership number</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">InvitedBy</TableCell>
                                {/* <TableCell align="right">Joined Time</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.users.map((user, index) => (
                                <TableRow key={user.username}>
                                    <TableCell>{index}</TableCell>
                                    <TableCell component="th" scope="row">
                                        {user.profile.realName}
                                    </TableCell>
                                    <TableCell align="right">{user.profile.sponsorName}</TableCell>
                                    {/* <TableCell align="right">{userJoinTime(user)}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Container>
                <BottomNav current="userlist" />
            </React.Fragment>
        );
    }
    else {
        return (
            <></>
        )
    }
}

export default withTracker(() => {
    const handle = Meteor.subscribe('userlist');
    return {
        users: Meteor.users.find({}, { sort: { createdAt: 1 } }).fetch(),
        ready: handle.ready()
    };
})(Login);
import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data';
import BottomNav from './Shared/BottomNav';
import TopNav from './Shared/TopNav';
import HomeIcon from '@material-ui/icons/HomeRounded';
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Typography, ListItemSecondaryAction } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { userInvites } from '../helpers';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    footer: {
        top: 'auto',
        bottom: 0,
    },
}));

function Login(props) {
    const classes = useStyles();
    const topNavStart = {
        icon: (<HomeIcon />),
        title: "Users",
        func: () => {
            props.history.push('/welcome')
        }
    };

    function userJoinTime(user) {
        if (user.createdAt == undefined) {
            return "Loading"
        }
        else {
            return user.createdAt.toString()

        }
    }

    if (props.ready) {
        const goToProfile = (userId) => {
            props.history.push(`/users/${userId}`);
        };

        function searchUser(id) {
            props.users.forEach((user) => {
                if (user._id == id) {
                    return user.profile.realName
                }
            })
        }
        return (
            <React.Fragment>
                <CssBaseline />
                <TopNav topNavStart={topNavStart} />
                <Toolbar id="back-to-top-anchor" />
                <Container style={{ marginBottom: '80px' }}>
                    <List className={classes.root}>
                        {props.users.map((user, index) => (
                            <div key={index}>
                                <ListItem
                                    alignItems="flex-start"
                                    onClick={() => { goToProfile(user._id) }}
                                    button
                                >
                                    <ListItemAvatar>
                                        <Avatar alt={user.profile.realName}>
                                            <AccountCircleIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={index+1 + ". " + user.profile.realName}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    component="span"
                                                    variant="body2"
                                                    className={classes.inline}
                                                    color="textPrimary"
                                                >
                                                    Invited by
                                                </Typography>
                                                {` - ${user.profile.sponsorName}`}
                                            </React.Fragment>
                                        }
                                    />
                                    <ListItemSecondaryAction>
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            className={classes.inline}
                                            color="textPrimary"
                                        >
                                            {userInvites(user)} Invites
                                        </Typography>
                                    </ListItemSecondaryAction>
                                </ListItem>
                                <Divider variant="inset" component="li" />
                            </div>
                        ))}
                    </List>
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
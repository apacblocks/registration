import React, { useState, useEffect } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { CssBaseline, Container, TextField, Button, Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopNav from '../Shared/TopNav';
import { Meteor } from 'meteor/meteor';
import CloseIcon from '@material-ui/icons/Close';
import { Topic } from '../../../api/topics/topics';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { formatDateTime } from '../../helpers';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        marginTop: '50px'
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
    },
    margin: {
        margin: theme.spacing(8, 1),
    },
    charCount: {
        fontStyle: "italic",
        color: "#999",
        fontSize: "0.875rem"
    },
    details: {
        background: '#e0e0e0', 
        padding: theme.spacing(2),
        fontStyle: 'italic'
    },
    summary: {
        margin: theme.spacing(2, 0),   
    }
}));

function ViewTopic(props) {

    if (!props.ready) {
        return (
            <p>Loading...</p>
        );
    } else {
        const classes = useStyles();
        const getTopicOwner = (userId) => {
            return Meteor.users.findOne({ _id: userId }).profile;
        };

        const topNavStart = {
            icon: (<CloseIcon />),
            title: '',
            func: () => {
                props.history.push('/topics')
            }
        }

        return (
            <React.Fragment>
                <CssBaseline />
                <TopNav topNavStart={topNavStart} />
                <Grid className={classes.root} container direction="column" justify="center" >
                    <Typography component="h6" variant="h6" color="textSecondary" style={{ fontSize: '18px' }}>
                        {getTopicOwner(props.topic.createdBy).realName}
                    </Typography>
                    <Typography component="h5" variant="h5">
                        {props.topic.title}
                    </Typography>
                    <Typography component="h6" variant="h6" color="textSecondary" style={{ margin: '10px 0', fontSize: '18px' }}>
                        <AccessTimeIcon style={{ marginBottom: '-3px', fontSize: '18px' }} /> {formatDateTime(props.topic.createdAt)}
                    </Typography>
                    <Typography variant="body2" component="p" className={classes.details}>
                        {props.topic.details}
                    </Typography>
                    <Typography variant="body1" component="p" className={classes.summary}>
                        {props.topic.summary}
                    </Typography>
                </Grid>
            </React.Fragment>
        );
    }
}


export default withTracker((props) => {
    const topicId = props.match.params._id;
    const subscription = Meteor.subscribe('topics', topicId);

    return {
        topic: Topic.findOne({ _id: topicId }),
        ready: subscription.ready()
    }
})(ViewTopic);
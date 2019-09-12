import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { CssBaseline, Container, Card, CardHeader, CardContent } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TopNav from './Shared/TopNav';
import BottomNav from './Shared/BottomNav';
import { Meteor } from 'meteor/meteor';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Route } from 'react-router';
import { Topic } from '../../api/topics/topics';
import moment from "moment";

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(10),
        right: theme.spacing(2),
    },
    card: {
        maxWidth: '100%',
        marginBottom: theme.spacing(2),
    }
}));

function Topics(props) {

    if (!props.ready) {
        return (
            <p>Loading...</p>
        )
    } else {
        const classes = useStyles();
        const topNavStart = {
            icon: (<SupervisedUserCircleIcon />),
            title: "Presentation Topics",
            func: () => {
                props.history.push('/welcome')
            }
        }

        // TODO: Move this to a helper file
        const formatDateTime = (date) => {
            return !date ? "" : moment(date).format("MMMM Do, YYYY")
        };

        const getTopicOwner = (userId) => {
            return Meteor.users.findOne({_id: userId}).profile;
        }

        return (
            <React.Fragment>
                <CssBaseline />
                <TopNav topNavStart={topNavStart} />
                <Container style={{ marginTop: '70px', marginBottom: '70px' }}>
                    {props.topics.map((topic, index) => (
                        <Card className={classes.card} elevation={0} key={index}>
                            <CardHeader
                                title={getTopicOwner(topic.createdBy).realName}
                                subheader={formatDateTime(topic.createdAt)}
                                titleTypographyProps={{ variant: 'subtitle1' }}
                            />
                            <CardContent>
                                <Typography variant="body1" color="textSecondary" component="p">
                                    {topic.details}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}

                    {Meteor.user() && (<Route render={({ history }) => (
                        <Fab
                            aria-label="Add"
                            onClick={() => { history.push('/propose') }}
                            className={classes.fab}
                            color="primary">
                            <AddIcon />
                        </Fab>
                    )} />)}

                </Container>
                <BottomNav current="topics" />
            </React.Fragment>
        );
    }
}


export default withTracker(() => {
    const subscription = Meteor.subscribe('topics');

    return {
        topics: Topic.find().fetch(),
        ready: subscription.ready()
    }
})(Topics);
import React, { useState, useEffect } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { CssBaseline, Container, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopNav from '../Shared/TopNav';
import { Meteor } from 'meteor/meteor';
import CloseIcon from '@material-ui/icons/Close';
import { proposeTopic } from '../../../api/topics/methods';
import SnackbarWrapper from '../Shared/SnackbarWrapper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
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
    }
}));

function ProposeTopic(props) {
    const classes = useStyles();
    const [topicErr, setTopicErr] = useState({});
    const [snackbar, setSnackbar] = useState({ open: false, variant: 'success', message: '' });
    const [topic, setTopic] = useState({ title: '', summary: '', details: '' });

    const [formCharCount, setFormChartCount] = useState({
        title: {
            max: 70,
            current: 0
        },
        summary: {
            max: 500,
            current: 0
        },
        details: {
            max: 160,
            current: 0
        }
    });

    const handleTopicChange = name => event => {
        setTopic({ ...topic, [name]: event.target.value });

        setFormChartCount({
            ...formCharCount,
            [name]: { ...formCharCount[name], current: event.target.value.length }
        });
    };

    const topNavStart = {
        icon: (<CloseIcon />),
        title: "Propose Topic",
        func: () => {
            props.history.push('/topics')
        }
    }

    const saveTopicProposal = () => {
        proposeTopic.call(topic, (err, _res) => {
            if (err && err.details) {
                let returnedErrs = {};
                for (let i = 0; i < err.details.length; i++) {
                    const errObj = err.details[i];
                    returnedErrs[errObj.name] = errObj.message;
                }

                setTopicErr({ ...returnedErrs });
            } else {
                setSnackbar({
                    ...snackbar,
                    ...{ open: true, variant: "success", message: "Topic proposal saved successfully" }
                });

                setTimeout(() => {
                    setSnackbar({ ...snackbar, ['open']: false });
                    props.history.push("/topics");
                }, 1500);
            }
        });
    };

    const topNavEnd = (
        <Button color="inherit" onClick={() => { saveTopicProposal() }}><strong>save</strong></Button>
    );

    return (
        <React.Fragment>
            <CssBaseline />
            <TopNav topNavStart={topNavStart} topNavEnd={topNavEnd} />
            <Container style={{ marginTop: '70px' }}>
                <form>
                    <TextField
                        error={(topicErr.title && topicErr.title.length > 1)}
                        id="topicTitle"
                        label="Title"
                        className={classes.textField}
                        value={topic.title}
                        onChange={handleTopicChange('title')}
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                        helperText={topicErr.title}
                    />
                    <Typography component="span" className={classes.charCount}>
                        {formCharCount.title.max - formCharCount.title.current + " characters left."}
                    </Typography>
                    
                    <TextField
                        error={(topicErr.summary && topicErr.summary.length > 1)}
                        id="topicSummary"
                        label="Summary"
                        placeholder="Summary of the presentation"
                        multiline
                        rows="4"
                        className={classes.textField}
                        value={topic.summary}
                        onChange={handleTopicChange('summary')}
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                        helperText={topicErr.summary}
                    />
                    <Typography component="span" className={classes.charCount}>
                        {formCharCount.summary.max - formCharCount.summary.current + " characters left."}
                    </Typography>

                    <TextField
                        error={(topicErr.details && topicErr.details.length > 1)}
                        id="topicDetails"
                        label="Why should the speaker be taken seriously?"
                        placeholder="Explain why should the speaker be taken seriously on this particular topic"
                        multiline
                        rows="2"
                        defaultValue={topic.details}
                        onChange={handleTopicChange('details')}
                        className={classes.textField}
                        margin="normal"
                        variant="outlined"
                        fullWidth={true}
                        style={{ marginTop: "20px" }}
                        helperText={topicErr.details}
                    />
                    <Typography component="span" className={classes.charCount}>
                        {formCharCount.details.max - formCharCount.summary.current + " characters left."}
                    </Typography>

                </form>
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


export default withTracker((props) => {
    const loggingIn = Meteor.loggingIn();
    const profile = Meteor.user() ? Meteor.user.profile : {};
    return {
        loggingIn,
        profile
    }
})(ProposeTopic);
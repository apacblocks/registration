import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { CssBaseline, Container, List, ListItem, ListItemText, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TopNav from '../Shared/TopNav';
import { Meteor } from 'meteor/meteor';
import CloseIcon from '@material-ui/icons/Close';
import NotFoundPage from '../Notfound'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { formatDateTime, userInvites } from '../../helpers';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        padding: 20,
        backgroundColor: theme.palette.background.paper,
    },
    avatar: {
        marginTop: 20,
        marginBottom: 20,
        width: 100,
        height: 100,
    },
    avatarIcon: {
        width: '100%',
        height: '100%'
    },
    secondaryText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontSize: '1.1rem'
    }
}));

function ViewProfile(props) {
    if (!props.ready) {
        return (
            <p>Loading...</p>
        )
    } else {
        if (props.user === undefined) {
            return <NotFoundPage />
        };

        console.log(props.user);
        const classes = useStyles();

        const topNavStart = {
            icon: (<CloseIcon />),
            title: props.user.profile.realName,
            func: () => {
                props.history.push('/userlist')
            }
        }

        return (
            <React.Fragment>
                <CssBaseline />
                <TopNav topNavStart={topNavStart} />
                <Grid className={classes.root} container direction="column" justify="center" alignItems="center" style={{ marginTop: '50px' }}>
                    <Avatar alt={props.user.profile.realName} className={classes.avatar} >
                        <AccountCircleIcon className={classes.avatarIcon} />
                    </Avatar>
                    <Typography variant="h6" component="h6" gutterBottom>
                        {props.user.profile.realName}
                    </Typography>

                    <div>
                        <AccessTimeIcon style={{ marginBottom: '-5px' }} />
                        <Typography variant="body1" component="span" color="textSecondary" gutterBottom>
                            {` ${formatDateTime(props.user.createdAt)}`} 
                        </Typography>
                        <Typography variant="body1" component="span" gutterBottom>
                           {` | ${userInvites(props.user)} Invites`}
                        </Typography>
                    </div>

                </Grid>
                <Container style={{ marginTop: '10px' }}>
                    <List style={{ width: '100%' }}>
                        <ListItem>
                            <ListItemText
                                primary="BTC Address"
                                primaryTypographyProps={{ component: "h6", style: { fontWeight: 600 } }}
                                secondary={props.user.profile.btcAddress}
                                secondaryTypographyProps={{ variant: "subtitle1", className: classes.secondaryText }}
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary="Telegram"
                                primaryTypographyProps={{ component: "h6", style: { fontWeight: 600 } }}
                                secondary={props.user.profile.telegram}
                                secondaryTypographyProps={{ variant: "subtitle1", className: classes.secondaryText }}
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary="Balance"
                                primaryTypographyProps={{ component: "h6", style: { fontWeight: 600 } }}
                                secondary={props.user.profile.balance + " APX"}
                                secondaryTypographyProps={{ variant: "subtitle1", className: classes.secondaryText }}
                            />
                        </ListItem>
                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary="Bio"
                                primaryTypographyProps={{ component: "h6", style: { fontWeight: 600 } }}
                                secondary={props.user.profile.bio}
                                secondaryTypographyProps={{ variant: "subtitle1", style: { wordWrap: 'break-word' } }}
                            />
                        </ListItem>

                        <Divider component="li" />
                        <ListItem>
                            <ListItemText
                                primary="Invited By"
                                primaryTypographyProps={{ component: "h6", style: { fontWeight: 600 } }}
                                secondary={props.user.profile.sponsorName}
                                secondaryTypographyProps={{ variant: "subtitle1", style: { wordWrap: 'break-word' } }}
                            />
                        </ListItem>
                    </List>
                </Container>
            </React.Fragment>
        );
    }
}


export default withTracker((props) => {
    const userId = props.match.params._id;
    const subscription = Meteor.subscribe('userlist', userId)
    return {
        user: Meteor.users.findOne({ _id: userId }),
        ready: subscription.ready()
    }
})(ViewProfile);
import React, {useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Logout from '@material-ui/icons/ExitToApp'
import ArrowBack from '@material-ui/icons/ArrowBack'
import IconButton from '@material-ui/core/IconButton'
import { Meteor } from 'meteor/meteor'
import QRCode from 'qrcode.react';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 1,
    },
}));

export default function Login(props) {

    const classes = useStyles();
    const [sponsorName, setSponsorName] = useState("Loading");
    function logout() {
        Meteor.logout((err) => {
            if (!err) {
                props.history.push('/')
            }
            else {
                console.log(err);
                alert(err);
            }
        })
    }

    if(!Meteor.user()){
        props.history.push('/')
        return <></>
    }
    
    Meteor.call('getUsername',Meteor.user().profile.invitedBy,(err,data)=>{
        if(!err){
            setSponsorName(data)
        }
        else
        {
            setSponsorName('Not Found')
        }
    })

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
                        onClick={() => props.history.push('/')}
                    >
                        <ArrowBack />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        APAC Block
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton
                        edge="end"
                        aria-label="more"
                        onClick={() => { logout() }}
                        color="inherit"
                    >
                        <Logout />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar id="back-to-top-anchor" />
            <Container style={{ minHeight: '100vh' }}>
                <List className={classes.root}
                subheader={<ListSubheader>User Name</ListSubheader>}>
                    <Grid container justify="center" alignItems="center">
                        <ListItem>
                            <ListItemText id="switch-list-label-darkMode" primary={Meteor.user().username} />
                        </ListItem>
                    </Grid>
                </List>
                <Divider />
                <List className={classes.root}
                subheader={<ListSubheader>Name</ListSubheader>}>
                    <Grid container justify="center" alignItems="center">
                        <ListItem>
                            <ListItemText id="switch-list-label-darkMode" primary={Meteor.user().profile.realName} />
                        </ListItem>
                    </Grid>
                </List>
                <Divider />
                <List className={classes.root}
                    subheader={<ListSubheader>Invitation QR code</ListSubheader>}>
                    <Grid container justify="center" alignItems="center">
                        <ListItem>
                            <QRCode value={'APAC'+Meteor.userId()} size="100%" renderAs='svg'/>
                        </ListItem>
                    </Grid>
                </List>
                <Divider />
                <List className={classes.root}
                subheader={<ListSubheader>Telegram</ListSubheader>}>
                    <Grid container justify="center" alignItems="center">
                        <ListItem>
                            <ListItemText id="switch-list-label-darkMode" primary={Meteor.user().profile.telegram} />
                        </ListItem>
                    </Grid>
                </List>
                <Divider />
                <List className={classes.root}
                subheader={<ListSubheader>BTC address</ListSubheader>}>
                    <Grid container justify="center" alignItems="center">
                        <ListItem>
                            <ListItemText id="switch-list-label-darkMode" primary={Meteor.user().profile.btcAddress} />
                        </ListItem>
                    </Grid>
                </List>
                <Divider />
                <List className={classes.root}
                subheader={<ListSubheader>Invited By</ListSubheader>}>
                    <Grid container justify="center" alignItems="center">
                        <ListItem>
                            <ListItemText id="switch-list-label-darkMode" primary={sponsorName} />
                        </ListItem>
                    </Grid>
                </List>
                <Divider />
            </Container>
        </React.Fragment>
    );
}

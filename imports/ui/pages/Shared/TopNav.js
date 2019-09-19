import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Logout from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core/styles';

const TopNav = (props) => {
    const useStyles = makeStyles(theme => ({
        grow: {
            flexGrow: 1,
        }
    }));
    
    const classes = useStyles();

    const logout = () => {
        if (props.edgeEndFn) {
            props.edgeEndFn()
        } else {
            Meteor.logout((err) => {
                if (!err) {
                    this.window.history.go('/')
                }
                else {
                    console.log(err);
                    alert(err);
                }
            })
        }
    };

    return (
        <AppBar position="fixed" elevation={0}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="go back"
                    onClick={props.topNavStart && props.topNavStart.func} 
                >
                    {props.topNavStart && props.topNavStart.icon}
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    {props.topNavStart && props.topNavStart.title}
                </Typography>
                <div className={classes.grow} />
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="go back"
                    onClick={props.topNavEnd && props.topNavEnd.func} 
                >
                    {props.topNavEnd && props.topNavEnd.icon}
                </IconButton>
            </Toolbar>
        </AppBar>
    )
};

export default TopNav;
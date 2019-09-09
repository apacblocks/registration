import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import Logout from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core/styles';

const TopNav = () => {
    const useStyles = makeStyles(theme => ({
        grow: {
            flexGrow: 1,
        }
    }));
    const classes = useStyles();
    const logout = () => {
        Meteor.logout((err) => {
            if (!err) {
                this.window.history.go('/')
            }
            else {
                console.log(err);
                alert(err);
            }
        })
    };

    let logoutBtn;

    if (Meteor.user()) {
        logoutBtn = (<IconButton edge="end" onClick={() => { logout() }} color="inherit" > <Logout /> </IconButton>);
    }

    return (
        <AppBar position="fixed" elevation={0}>
            <Toolbar>
                <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                    aria-label="go back"
                    onClick={() => window.history.back()}
                >
                    <SupervisedUserCircleIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap>
                    APAC Blocks
                </Typography>
                <div className={classes.grow} />
                {logoutBtn}
            </Toolbar>
        </AppBar>
    )
};

export default TopNav;
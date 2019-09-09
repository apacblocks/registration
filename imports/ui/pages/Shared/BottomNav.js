import React, { useState }  from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import { Route } from 'react-router'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SettingsIcon from '@material-ui/icons/Settings';
import HomeIcon from '@material-ui/icons/Home';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { makeStyles } from '@material-ui/core/styles';

const BottomNav = (props) => {
    const useStyles = makeStyles(_theme => ({
        grow: {
            flexGrow: 1,
        },
        stickToBottom: {
            width: '100%',
            position: 'fixed',
            bottom: 0,
        },
        footer: {
            top: 'auto',
            bottom: 0,
        }
    }));

    const classes = useStyles();
    const current = props.current ? props.current : 'welcome';
    const [currentTab, setCurrentTab] = useState(current);

    const onChangeTab = (_event, newTab) => {
        setCurrentTab(newTab);
    };

    return (
        <AppBar position="sticky" color="primary" className={classes.footer}>
            {Meteor.user() ? (<BottomNavigation
                value={currentTab}
                onChange={onChangeTab}
                className={classes.stickToBottom}
            >
                <BottomNavigationAction component={Link} to="/welcome" label="Home" value="welcome" icon={<HomeIcon />} />
                <BottomNavigationAction component={Link} to="/userlist" label="Users" value="userlist" icon={<SupervisedUserCircleIcon />} />
                <BottomNavigationAction component={Link} to="/propose" label="Propose" value="propose" icon={<AddCircleOutlineIcon />} />
                <BottomNavigationAction component={Link} to="/profile" label="Profile" value="profile" icon={<AccountCircleIcon />} />
                <BottomNavigationAction component={Link} to="/settings" label="Settings" value="settings" icon={<SettingsIcon />} />
            </BottomNavigation>) : (
                    <Toolbar>
                        <Route render={({ history }) => (
                            <Button color="inherit" style={{ width: '50%' }}
                                onClick={() => { history.push('/join') }}
                            >
                                Join
                            </Button>
                        )} />

                        <Route render={({ history }) => (
                            <Button color="inherit" style={{ width: '50%' }}
                                onClick={() => { history.push('/login') }}
                            >
                                {(Meteor.user()) ? "Profile" : "Login / Profile"}
                            </Button>
                        )} />
                    </Toolbar>)}
        </AppBar>
    )
};

export default BottomNav;
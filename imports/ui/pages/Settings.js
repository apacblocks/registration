import React, { useState } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { CssBaseline, Container, TextField, Divider, Button, IconButton } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TopNav from './Shared/TopNav';
import BottomNav from './Shared/BottomNav';
import CloseIcon from '@material-ui/icons/Close';
import { Meteor } from 'meteor/meteor';
import SnackbarWrapper from './Shared/SnackbarWrapper';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    margin: {
        margin: theme.spacing(8, 1),
    },
}));

function Settings(props) {
    if (props.loggingIn) {
        return (
            <p>Loading</p>
        );
    } else {
        const classes = useStyles();
        const currentUser = Meteor.user();
        const [profileValues, setProfileValues] = useState(currentUser.profile);
        const [snackbar, setSnackbar] = useState({ open: false, variant: 'success', message: '' });

        const handleProfileChange = name => event => {
            setProfileValues({ ...profileValues, [name]: event.target.value });
        };

        const updateProfile = () => {
            const { bio, telegram, btcAddress } = profileValues;
            const userData = {
                bio: bio,
                telegram: telegram,
                btcAddress: btcAddress
            };

            Meteor.call('updateUser', userData, (err, _data) => {
                if (!err) {
                    setSnackbar({
                        ...snackbar,
                        ...{ open: true, variant: "success", message: "updated successfully" }
                    });
                } else {
                    setSnackbar({
                        ...snackbar,
                        ...{ open: true, variant: "error", message: err.message }
                    });
                }

                setTimeout(() => {
                    setSnackbar({ ...snackbar, ['open']: false })
                }, 1500);
            });
        };

        const topNavEnd = (
            <Button color="inherit" onClick={() => { updateProfile() }}><strong>save</strong></Button>
        )

        const topNavStart = {
            icon: (<CloseIcon />),
            title: "Settings",
            func: () => {
                props.history.push('/profile')
            }
        }

        return (
            <React.Fragment>
                <CssBaseline />
                <TopNav topNavStart={topNavStart} topNavEnd={topNavEnd} />
                <Container style={{ marginTop: '70px' }}>
                    <Typography variant="h2" gutterBottom>
                        <form>
                            <TextField
                                id="btcAddress"
                                label="BTC Address"
                                className={classes.textField}
                                value={profileValues.btcAddress}
                                onChange={handleProfileChange('btcAddress')}
                                margin="normal"
                                variant="outlined"
                                fullWidth={true}
                            />
                            <TextField
                                id="telegram"
                                label="Telegram Username"
                                className={classes.textField}
                                value={profileValues.telegram}
                                onChange={handleProfileChange('telegram')}
                                margin="normal"
                                variant="outlined"
                                fullWidth={true}
                            />
                            <TextField
                                id="bio"
                                label="Personal Bio"
                                multiline
                                rows="4"
                                defaultValue={profileValues.bio}
                                onChange={handleProfileChange('bio')}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                fullWidth={true}
                                style={{ marginTop: "20px" }}
                            />
                        </form>
                    </Typography>
                    <SnackbarWrapper
                        open={snackbar.open}
                        variant={snackbar.variant}
                        message={snackbar.message} 
                        className={classes.margin}
                    />
                </Container>
                <BottomNav current="profile" />
            </React.Fragment>
        );
    }
}

export default withTracker((props) => {
    const loggingIn = Meteor.loggingIn();
    const profile = Meteor.user() ? Meteor.user.profile : {};
    return {
        loggingIn,
        profile
    }
})(Settings);
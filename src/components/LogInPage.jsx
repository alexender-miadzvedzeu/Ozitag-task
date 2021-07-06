import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = props => {
    
    const [emailVal, setEmailVal] = useState('user@ozitag.com');
    const [passlVal, setPasslVal] = useState('user');

    const classes = useStyles();

    const signInReq = async () => {
        await fetch('https://tager.dev.ozitag.com/api/auth/user', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ "clientId": 1, "email": emailVal, "password": passlVal })
        })
        .then(res => {
            if (res.status === 200) {   
                props.setLoged(true);
                return res.json();      
            } else {
                console.log(res);
            }
        })
        .then(data => props.setData(data));
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Sign in OZITAG
                </Typography>
                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoFocus
                        onChange={e => setEmailVal(e.target.value)}
                        value={emailVal}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPasslVal(e.target.value)}
                        value={passlVal}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>signInReq()}
                    >
                        Sign In
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default SignIn;
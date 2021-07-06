import React, { useEffect, useState } from 'react';
import './UserPage.css';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const UserPage = props => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        if (typeof props.data !== 'undefined') {
            getUserInfo(props.data.accessToken);
        }
    }, [props]);

    const getUserInfo = async token => {

        await fetch('https://tager.dev.ozitag.com/api/tager/user/profile', {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => setUserData(data))
    }

    const useStyles = makeStyles((theme) => ({
        submit: {
            margin: theme.spacing(3, 0, 2),
            width: "200px"
        },
    }));

    const classes = useStyles();

    return (
        <>
            {
                typeof userData.data !== 'undefined' ?
                    <div className="wrapper">
                        <h1>Hello, {userData.data.name}</h1>
                        <div className="avaConteiner">
                            <img className="ava" src="https://png.pngtree.com/element_our/20190604/ourlarge/pngtree-user-avatar-boy-image_1482937.jpg" alt="ava" />
                        </div>
                        <div className="infoConteiner">
                            <p className="info">User name: <span className="info__span">{userData.data.name}</span></p>
                            <p className="info">Email: <span className="info__span">{userData.data.email}</span></p>
                        </div>
                        <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={()=>props.setLoged(false)}
                    >
                        Log out
                    </Button>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default UserPage;
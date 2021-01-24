import React from 'react';
import {useDispatch} from "react-redux";
import {Button} from '@material-ui/core';
import {auth, provider} from '../../firebase'
import {login} from '../../features/appSlice'
import './style.css'
const Login = () => {
    const dispatch = useDispatch();
    const signIn =() => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch(login ({
                    username: result.user.displayName,
                    profilePic : result.user.photoURL,
                    id:result.user.uid
                }));
            }).catch(error =>alert(error.message));
    };
    return (
        <div className="login">
            <div className="login__container">
                <Button variant="outlined"  onClick ={signIn}>
                    Sign in with Google
                </Button>

            </div>
        </div>
    );
};

export default Login;
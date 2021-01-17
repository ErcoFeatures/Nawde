import React, {useEffect} from 'react';
import {BrowserRouter as Router, Switch, Route,} from "react-router-dom";
import './app.css'
import WebCamCapture from "./component/WebCamCapture";
import Preview from './component/Preview'
import Chats from "./component/Chats";
import ChatView from "./component/ChatView";
import {useDispatch, useSelector} from "react-redux";
import {login, selectUser, logout} from "./features/appSlice";
import Login from "./component/Login";
import {auth} from './firebase'

function App() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect( () =>{
        auth.onAuthStateChanged(authUser => {
            if(authUser){
                dispatch(login ({
                    username: authUser.displayName,
                    profilePic : authUser.photoURL,
                    id:authUser.uid
                }));
            }else{
                dispatch(logout())
            }
        })
    }, [])
    return (
        <div className="app">
            <Router>
                {
                    !user ? (
                        <Login/>
                        )
                        :(
                        <>
                        <img
                            className='app__logo'
                            src=''
                        />
                        <div className={"app__body"}>
                            <div className='app__bodyBackground'>
                            <Switch>
                                <Route path="/chats/view">
                                    <ChatView/>
                                </Route>
                                <Route path="/preview">
                                    <Preview/>
                                </Route>
                                <Route  path="/post/new">
                                    <WebCamCapture/>
                                </Route>
                                <Route exact path="/">
                                    <Chats/>
                                </Route>
                            </Switch>
                        </div>
                        </div>
                    </>
                        )}

            </Router>


        </div>
    );
}

export default App;

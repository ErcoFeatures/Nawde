import React from 'react';
import './style.css';
import Avatar from "@material-ui/core/Avatar";
import StopRoundedIcon from '@material-ui/icons/StopRounded'
import DeleteICon from '@material-ui/icons/Delete'
import ReactTimeAgo from 'react-timeago'
import {selectImage} from "../../features/appSlice";
import {useDispatch} from "react-redux";
import {db} from '../../firebase'
import {useHistory} from 'react-router-dom'

const Chat = ({id, username, timestamp, imageUrl, profilePic, read}) => {
    const dispatch = useDispatch();
    const history = useHistory()
    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            db.collection('posts').doc(id).set(
                {
                    read: true
                },
                {merge: true}
            );
            history.push('/chats/view')
        }
    }
    const deleteChat =()=>{
        db.collection('posts').doc(id).delete()

    }
    return (
        <div onClick={open} className="chat">
            <Avatar src={profilePic}/>
            <div className="chat__info">
                <h4>{username}</h4>
                <p>
                    {!read &&  "Tap to view - "} {""}  <ReactTimeAgo date={new Date(timestamp?.toDate()).toUTCString()}/>
                </p>
            </div>

            {!read ?
                <StopRoundedIcon className="chat__readIcon"/>
                :
                <DeleteICon
                    className="chat__delete"
                    onClick={deleteChat}
                />
            }

        </div>
    );
};

export default Chat;
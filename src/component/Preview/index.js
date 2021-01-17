import React, {useEffect} from 'react';
import "./style.css"
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {selectCameraImage} from "../../features/cameraSlice";
import CloseIcon from '@material-ui/icons/Close'
import CreateIcon from '@material-ui/icons/Create'
import TextFieldsIcon from '@material-ui/icons/TextFields'
import NoteIcon from '@material-ui/icons/Note'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import AttachFileIcon from '@material-ui/icons/AttachFile'
import CropIcon from '@material-ui/icons/Crop'
import TimerIcon from '@material-ui/icons/Timer'
import SendIcon from '@material-ui/icons/Send'
import {resetCameraImage} from "../../features/cameraSlice";
import {v4 as uuid} from 'uuid'
import {db, storage} from "../../firebase";
import firebase from "firebase";
import {selectUser} from "../../features/appSlice";

const Preview = () => {
    const cameraImage = useSelector(selectCameraImage);
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    useEffect(() => {
        if (!cameraImage) {
            history.replace('/post/new');
        }
    }, [cameraImage, history]);

    const closePreview = () => {
        dispatch(resetCameraImage());
    };
    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage
            .ref(`posts/${id}`)
            .putString(cameraImage, "data_url");

        uploadTask.on("state_changed", null, (error)=> {
            // Error function
            console.log(error)
        }, () => {
            //Complete function
            storage.ref('posts').child(id).getDownloadURL()
                .then((url)=>{
                    db.collection('posts').add({
                        imageUrl : url,
                        username: user.username,
                        read:false,
                        profilePic :user.profilePic,
                        timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                    });
                    history.replace('/')
                })
        });
    };
    return (
        <div className={"preview"}>
            <CloseIcon
                className='preview__close'
                onClick={closePreview}
            />
            <div className={"preview__toolbarRight"}>
                <TextFieldsIcon/>
                <CreateIcon/>
                <NoteIcon/>
                <MusicNoteIcon/>
                <AttachFileIcon/>
                <CropIcon/>
                <TimerIcon/>
            </div>
            <img src={cameraImage} alt={""}/>
            <div onClick={sendPost} className="preview__footer">
                <h2> Send Now </h2>
                <SendIcon className='preview__sendIcon'/>
            </div>

        </div>
    );
};

export default Preview;
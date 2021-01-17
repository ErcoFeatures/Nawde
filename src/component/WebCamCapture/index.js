import React, {useRef, useCallback, useState} from 'react';
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import {setCameraImage} from "../../features/cameraSlice";
import './style.css'

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user"
};


const WebcamCapture = () => {
    const webCamRef = useRef(null);
    const dispatch  = useDispatch();
    const history = useHistory();
    const capture = useCallback(() => {
        const imageSrc = webCamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        // BEM naming convention
        history.push("/preview")
    }, [webCamRef])
    return (
        <div className={"webCamCapture"}>
            <Webcam
                audio={false}
                height={videoConstraints.height}
                ref={webCamRef}
                screenshotFormat="image/jpeg"
                width={videoConstraints.width}
                videoConstraints={videoConstraints}
            />
            <RadioButtonUncheckedIcon
                className={"webCamCapture__button"}
                onClick={capture}
                fontSize={"large"}
            />
        </div>
    );
};

export default WebcamCapture;
import React, { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import { Button } from "../ButtonComponent/ButtonComponent";
import { useDispatch } from "react-redux";
const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user" // user: front-camera, environment: back-camera
};
export const WebcamComponent: React.FC = () => {
    const webcamRef = useRef<any>(null)
    const dispatch = useDispatch()
    const handleCapture = useCallback(
        () => {
            const imageSrc = webcamRef.current.getScreenshot();
            dispatch({
                type: 'ADD',
                payload: imageSrc
            })
        },
        [webcamRef],
    )

    return <div>
        <Button buttonLabel='Snap' buttonClick={e => handleCapture()} buttonStyle='default-size-btn' />
        <div className=' mt-10'>
            <Webcam audio={false}
                ref={webcamRef}
                width={800}
                screenshotFormat="image/jpeg"
                videoConstraints={videoConstraints} />
        </div>
    </div>
}
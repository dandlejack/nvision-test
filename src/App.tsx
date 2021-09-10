import { useRef, useState } from 'react';
import './App.css';
import { WebcamComponent } from './components/WebcamComponent/WebcamComponent'
import { Button } from './components/ButtonComponent/ButtonComponent';
import { Upload } from './components/UploadComponent/UploadComponent'
import { ResultComponent } from './components/ResultComponent/ResultComponent';
import { useDispatch } from 'react-redux';
import browseImg from './images/browseImg.png'
import cameraImg from './images/camera.png'
function App() {
  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const [cameraState, setCameraState] = useState({
    openCamera: false,
    btnLabel: 'Webcam'
  })  
  const [invalidFileType, setInvalidFileType] = useState(false);
  document.title = "Nipa Test";

  const getBase64 = (file: Blob) => {
    let reader = new FileReader();
    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        reader.readAsDataURL(file)
        reader.onloadend = () => {
          dispatch(
            {
              type: 'ADD',
              payload: reader.result
            })
        }
      } else {
        setInvalidFileType(true)
        ref.current!.value = ''
      }
    }
  }

  const handleChange = (e: any) => {
    const file = e.target.files[0]
    getBase64(file)
  }

  const handleReset = () => {
    ref.current!.value = ''
    dispatch({
      type: 'REMOVE',
      payload: ''
    })
  }

  return (
    <div className="App">
      <div className='m-center mt-10 upload-box'>
        <div className='flex flex-warp justify-center' style={{ height: 45, backgroundColor: '#fafafa', border: '1px dashed' }}>
          <div className='flex m-center  mt-5'>
            <Upload id='upload' ref={ref} buttonLabel='Browse' onChange={handleChange} buttonStyle='custom-file-upload text-underline-hover mr-10' logo={browseImg}></Upload>
            <span className=' mt-5 mr-10'>or</span>
            <label className='text-underline-hover'>
              <div className='flex'>
                <img alt='camera' src={cameraImg} style={{ float: 'left' }} />
                <Button buttonLabel={cameraState.btnLabel} buttonClick={() => setCameraState({ openCamera: !cameraState.openCamera, btnLabel: cameraState.openCamera ? 'Webcam' : 'Close' })} buttonStyle='hidden' />
                <span className='mt-5'>{cameraState.btnLabel}</span>
              </div>
            </label>
          </div>
          {invalidFileType ? <div className='alert'>
            <span className="closebtn" onClick={e => setInvalidFileType(false)}>&times;</span>
            <strong> Image File Only! </strong>
          </div> : null}
        </div>
        <div className='mt-10'>
          <div>
            <Button buttonLabel='Clear' buttonClick={handleReset} buttonStyle='default-size-btn danger' />
          </div>
          <div className='mt-10'>
            {cameraState.openCamera ? <WebcamComponent /> : null}
          </div>
        </div>
      </div>
      <ResultComponent />
    </div>
  );
}

export default App;

import { useRef, useState } from 'react';
import './App.css';
import { WebcamComponent } from './components/WebcamComponent/WebcamComponent'
import { Button } from './components/ButtonComponent/ButtonComponent';
import { Upload } from './components/UploadComponent/UploadComponent'
import { ResultComponent } from './components/ResultComponent/ResultComponent';
import { useDispatch } from 'react-redux';
function App() {
  const ref = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()
  const [cameraState, setCameraState] = useState({
    openCamera: false,
    btnLabel: 'Webcam'
  })
  const getBase64 = (file: Blob) => {
    let reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        dispatch(
          {
            type: 'ADD',
            payload: reader.result
          })
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
      <div>
        <div className='flex flex-warp justify-center mt-10' style={{ height: 45, backgroundColor: '#fafafa', border: '1px dashed' }}>
          <div style={{ margin: 'auto 0px' }}>
            <Upload id='upload' ref={ref} buttonLabel='Browse' onChange={handleChange} buttonStyle='custom-file-upload text-underline mr-10'></Upload>
            <span className='mr-10'>or</span>
            <label className='text-underline'>
              <Button buttonLabel={cameraState.btnLabel} buttonClick={() => setCameraState({ openCamera: !cameraState.openCamera, btnLabel: cameraState.openCamera ? 'Webcam' : 'Close' })} buttonStyle='hidden' />
              {cameraState.btnLabel}
            </label>
          </div>
        </div>
        <div className='mt-10'>
          <div>
            <Button buttonLabel='Clear' buttonClick={handleReset} buttonStyle='default-size-btn' />
          </div>
          <div className='mt-10'>
            {cameraState.openCamera ? <WebcamComponent /> : null}
          </div>
        </div>
        <ResultComponent />
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from 'react'
import { RootStateOrAny, useSelector } from 'react-redux'
import { NipaApi } from '../../api/NipaApi'
import { LoaderComponent } from '../LoaderComponent/LoaderComponent'

export const ResultComponent: React.FC = () => {
    const imgSelector = useSelector((state: RootStateOrAny) => state)
    const [isLoading, setLoading] = useState(false)
    const [newImage, setNewImage] = useState('')
    const [boundaries, setBoundaries] = useState({
        service_id: '',
        detected_objects: []
    })
    const [storeXYOfOriginal, setStoreXYOfOriginal] = useState({
        width: 0,
        height: 0
    })

    useEffect(() => {
        setLoading(true)
        async function fetchObjectDetection() {
            let img = document.createElement("img")
            img.setAttribute("src", imgSelector.uploadImage)
            setStoreXYOfOriginal({ width: img.width, height: img.height })
            const splitComma = imgSelector.uploadImage.split(',')
            const response = await NipaApi.getObjectDection(splitComma[1])
            setBoundaries(response)
            setLoading(false)

        }
        if (imgSelector.uploadImage) {
            fetchObjectDetection()
        }
    }, [imgSelector.uploadImage]);

    useEffect(() => {
        drawCanvas()
    }, [boundaries]);

    const drawCanvas = () => {
        let canvas = document.getElementById('canvasResult') as HTMLCanvasElement;
        let img = document.getElementById("originalImg") as HTMLImageElement;
        if (canvas !== null && img !== null) {
            let ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(img, 0, 0, storeXYOfOriginal.width, storeXYOfOriginal.height);
                ctx.lineWidth = 5;
                ctx.strokeStyle = '#FF0000'
                boundaries.detected_objects.map((detailObjs: any) => {
                    ctx?.strokeRect(detailObjs.bounding_box.left, detailObjs.bounding_box.top, detailObjs.bounding_box.right - detailObjs.bounding_box.left, detailObjs.bounding_box.bottom - detailObjs.bounding_box.top)
                    ctx!.font = (storeXYOfOriginal.width/35).toFixed(0).toString()+"px serif";                    
                    ctx!.fillStyle = 'red'
                    ctx?.fillRect(detailObjs.bounding_box.left-3,detailObjs.bounding_box.top-30,detailObjs.bounding_box.right - detailObjs.bounding_box.left+4,30)
                    ctx!.fillStyle = 'blue'
                    ctx!.fillText(detailObjs.name +' : '+((detailObjs.confidence*100).toFixed(2)).toString() , detailObjs.bounding_box.left, detailObjs.bounding_box.top);
                })
                const canvasToImage = canvas.toDataURL('image/jpeg',1)
                setNewImage(canvasToImage)
            }
        }
    }

    return <>
        {imgSelector.uploadImage ? <div className='flex flex-warp justify-center mt-10'>
            <div className='mr-0-sm mr-10'>
                <label>Original</label>
                <div>
                    <img id='originalImg' src={imgSelector.uploadImage} className='original-img' /> {/*style={{ width: 800, height: 540 }} />*/}
                </div>
            </div>
            <div>
                <label>Object Detection Result</label>
                <div>
                    <canvas id="canvasResult" width={storeXYOfOriginal.width} height={storeXYOfOriginal.height} style={{ display: 'none' }} />

                    {isLoading ? <LoaderComponent /> : null}
                    {newImage !== '' ? <img id='result' src={newImage} className='result-img'/> : null}
                </div>
            </div>
        </div> : null}
    </>
}
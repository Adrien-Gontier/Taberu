import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import BarCodeContext from '../context/BarCodeContext'
import BarCodePicture from '../assets/bar_code_icon.svg'
import { useNavigate } from 'react-router-dom'
import ProductResultContext from '../context/ProductResultContext'

export default function BarCodeSearch() {
    const { barCode, setBarCode } = useContext(BarCodeContext)
    const { productResult, setProductResult } = useContext(ProductResultContext)
    const [playing, setPlaying] = useState(false)

    const navigate = useNavigate()

    let API_URL

    useEffect(() => {
        API_URL =
            'https://world.openfoodfacts.org/api/v0/product/' +
            barCode +
            '.json'

        if (barCode != null) {
            axios.get(API_URL).then((res) => {
                const occurrence = res.data
                setProductResult(occurrence)
                navigate('/product')
            })
        }
    }, [barCode])

    const startVideo = () => {
        setPlaying(true)
        navigator.getUserMedia(
            {
                video: true,
            },
            (stream) => {
                let video = document.getElementsByClassName('app__videoFeed')[0]
                if (video) {
                    video.srcObject = stream
                }
            },
            (err) => console.error(err)
        )

        const barcodeDetector = new BarcodeDetector()
        let itemsFound = []
        let myBarCode = null

        function render() {
            barcodeDetector
                .detect(video)
                .then((barcodes) => {
                    barcodes.forEach((barcode) => {
                        if (!itemsFound.includes(barcode.rawValue)) {
                            itemsFound.push(barcode.rawValue)
                            myBarCode = barcode.rawValue
                        }
                    })
                })
                .catch(console.error)
        }

        ;(function renderLoop() {
            // mettre cela à part, ou pas,  avec une conditionnelle

            if (myBarCode == null) {
                // test playing boolean
                requestAnimationFrame(renderLoop)
                render()
            } else {
                setPlaying(false)
                let video = document.getElementsByClassName('app__videoFeed')[0]
                video.srcObject.getTracks()[0].stop()
                setBarCode(myBarCode)
            }
        })()
    }

    const stopVideo = () => {
        setPlaying(false)
        let video = document.getElementsByClassName('app__videoFeed')[0]
        video.srcObject.getTracks()[0].stop()
    }

    const pictureOfBarCode = (
        <img className="" src={BarCodePicture} alt="image de code barre" />
    )

    const test = playing ? (
        <video
            width={300}
            height={300}
            id="video"
            muted
            autoPlay
            className="app__videoFeed"
        ></video>
    ) : (
        <video width={0} height={0} id="video"></video>
    )

    return (
        <div className="barCodeSearch">
            <p>
                Si vous voulez rechercher par code barre, veuillez cliquez sur
                l'image du code barre si dessous :
            </p>

            <div className="app__input">
                {playing ? (
                    <button onClick={stopVideo}>{pictureOfBarCode}</button>
                ) : (
                    <button onClick={startVideo}>{pictureOfBarCode}</button>
                )}
            </div>

            <div className="app__container">{test}</div>
        </div>
    )
}

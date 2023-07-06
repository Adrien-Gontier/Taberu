import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GlassIcon from '../assets/pictures/glass_magnifier_search_icon.svg'
import ProductResultContext from '../context/ProductResultContext'
import axios from 'axios'

export default function NameNumberSearch() {
    const [nameNumberFilled, setNameNumberFilled] = useState('')
    const [barCodeNumber, setBarCodeNumber] = useState(null)
    const { productResult, setProductResult } = useContext(ProductResultContext)

    const navigate = useNavigate()

    const glassIcon = (
        <img
            className="nameNumberSearch__input-glassIcon__GlassIcon"
            src={GlassIcon}
            alt="Glass icon"
        />
    )

    let API_URL

    useEffect(() => {
        API_URL =
            'https://world.openfoodfacts.org/api/v0/product/' +
            barCodeNumber +
            '.json'

        if (barCodeNumber != null) {
            axios.get(API_URL).then((res) => {
                const occurrence = res.data
                setProductResult(occurrence)
                navigate('/product')
            })
        }
    }, [barCodeNumber])

    return (
        <div className="nameNumberSearch">
            <p>Recherche par numéro de code barre</p>
            <div className="nameNumberSearch__input-glassIcon">
                <label>
                    <input
                        value={nameNumberFilled}
                        onChange={(event) => {
                            setNameNumberFilled(event.target.value)
                        }}
                        type="text/number"
                    />
                </label>
                {nameNumberFilled == null ? (
                    glassIcon
                ) : (
                    <Link onClick={() => setBarCodeNumber(nameNumberFilled)}>
                        {glassIcon}
                    </Link>
                )}
            </div>
        </div>
    )
}

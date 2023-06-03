import homeIcon from '../assets/home_icon.svg'
import blackEmptyStar from '../assets/black_empty_star_icon.svg'
import glass from '../assets/glass_magnifier_search_icon.svg'
import barCodePict from '../assets/bar_code_icon.svg'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import ProductResultContext from '../context/ProductResultContext'
import BarCodeContext from '../context/BarCodeContext'

export default function Navbar() {
    const { productResult, setProductResult } = useContext(ProductResultContext)
    const { barCode, setBarCode } = useContext(BarCodeContext)
    return (
        <div className="navbar">
            <Link to="/">
                <img
                    className="navbar_homeIcon"
                    src={homeIcon}
                    alt="Home icon"
                    onClick={() => {
                        setProductResult(null)
                        setBarCode(null)
                    }}
                />
            </Link>
            <Link to="/favorites">
                <img
                    className="navbar__emptyStarIcon"
                    src={blackEmptyStar}
                    alt="Black empty star"
                />
            </Link>
            <Link to="/searchresult">
                <img className="navbar__glassIcon" src={glass} alt="Glass" />
            </Link>
            <Link to="/">
                <img
                    className="navbar__barcodeIcon"
                    src={barCodePict}
                    alt="Bar code"
                />
            </Link>
        </div>
    )
}

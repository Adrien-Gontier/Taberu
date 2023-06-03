import GlassIcon from '../assets/glass_magnifier_search_icon.svg'
import { Link } from 'react-router-dom'
import NameNumberSearch from '../components/NameNumberSearch'
import BarCodeSearch from '../components/BarCodeSearch'

export default function DoubleSearch() {
    const glassIcon = (
        <img
            className="searchResult__input-glassIcon__GlassIcon"
            src={GlassIcon}
            alt="Glass icon"
        />
    )

    return (
        <div className="doubleSearch">
            <NameNumberSearch />
            <div className="doubleSearch__searchByName">
                <p>Pour fair une recherche par nom de produit</p>
                <p>Cliquez sur la loupe</p>
                <Link to="/searchresult">{glassIcon}</Link>
            </div>
            <BarCodeSearch />
        </div>
    )
}

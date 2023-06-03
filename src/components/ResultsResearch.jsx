import { useContext } from 'react'
import { Link } from 'react-router-dom'
import ProductResultContext from '../context/ProductResultContext'

export default function ResultsResearch(props) {
    const { productResult, setProductResult } = useContext(ProductResultContext)

    return (
        <>
            <Link
                to="/product"
                className="resultsResearch"
                onClick={() => setProductResult(props.props)}
            >
                <div className="resultsResearch__nameProduct">
                    {props.props.generic_name}
                </div>
            </Link>
        </>
    )
}

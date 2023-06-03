import { useState, useEffect, useContext, React } from 'react'
import axios from 'axios'
import NameNumberContext from '../context/NameNumberContext'
import GlassIcon from '../assets/glass_magnifier_search_icon.svg'
import ResultsResearch from '../components/ResultsResearch'

export default function SearchResult() {
    const { nameNumber, setNameNumber } = useContext(NameNumberContext)

    const [nameFilled, setNameFilled] = useState('')
    const [result, setResult] = useState(null)

    let API_URL

    useEffect(() => {
        API_URL =
            'https://world.openfoodfacts.org/cgi/search.pl?search_terms=' +
            nameNumber +
            '&search_simple=1&action=process&json=1'

        if (nameNumber === null) {
            setResult(null)
        } else {
            axios.get(API_URL).then((res) => {
                const occurrence = res.data
                setResult(occurrence)
            })
        }
    }, [nameNumber])

    const glass_Icon = (
        <img
            className="searchResult__input-glassIcon__GlassIcon"
            src={GlassIcon}
            alt="Glass icon"
        />
    )
    const searchButton = (
        <button onClick={() => setNameNumber(nameFilled)}>{glass_Icon}</button>
    )

    let allResults
    result === null ? null : (allResults = result.products)

    const regexTemper = /[a-z]/i

    return (
        <div className="searchResult">
            <p className="searchResult__title">Recherche par nom</p>
            <div className="searchResult__input-glassIcon">
                <label>
                    <input
                        value={nameFilled}
                        type="text"
                        onChange={(event) => {
                            setNameFilled(event.target.value)
                            setNameNumber(null)
                        }}
                    />
                </label>
                {nameFilled === ''
                    ? glass_Icon
                    : nameFilled.match(regexTemper)
                    ? searchButton
                    : glass_Icon}
            </div>

            {nameFilled === '' ? (
                <></>
            ) : nameFilled.match(regexTemper) ? (
                <></>
            ) : (
                <p className="searchResult__regex">
                    Veuillez ne pas renseigner seulement des nombres où des
                    caractères spéciaux
                </p>
            )}

            <>
                {nameFilled === '' ? (
                    <></>
                ) : (
                    allResults?.map((oneResult) => (
                        <div key={oneResult._id}>
                            <ResultsResearch props={oneResult} />
                        </div>
                    ))
                )}
            </>
        </div>
    )
}

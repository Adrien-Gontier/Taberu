import React, { useContext, useEffect, useState } from 'react'
import NutriscorPictA from '../assets/nutriscore-a.svg'
import NutriscorPictB from '../assets/nutriscore-b.svg'
import NutriscorPictC from '../assets/nutriscore-c.svg'
import NutriscorPictD from '../assets/nutriscore-d.svg'
import NutriscorPictE from '../assets/nutriscore-e.svg'
import NutriscorPictUnknow from '../assets/nutriscore-unknown.svg'
import FavoritesContext from '../context/FavoritesContext'
import ProductResultContext from '../context/ProductResultContext'
import FavoritesEmptyIcon from '../assets/black_empty_star_icon.svg'
import FavoritesFullIcon from '../assets/gold_full_star_icon.svg'

export default function ProductFound() {
    const { productResult, setProductResult } = useContext(ProductResultContext)
    const { favorites, setFavorites } = useContext(FavoritesContext)
    const [booleanFavorites, setBooleanFavorites] = useState(false)

    useEffect(() => {
        favorites.find((oneProduct) => oneProduct.code == productResult.code)
            ? setBooleanFavorites(true)
            : setBooleanFavorites(false)
    }, [])

    const favoritesNoneIcon = (
        <img
            onClick={() => {
                setBooleanFavorites(!booleanFavorites)
                let favoritesCopy = favorites
                favoritesCopy.push(productResult)
                setFavorites(favoritesCopy)
            }}
            src={FavoritesEmptyIcon}
            alt=""
        />
    )
    const favoritesPresentIcon = (
        <img
            onClick={() => {
                setBooleanFavorites(false)
                let favoritesCopy = favorites
                const indexId = favoritesCopy.indexOf(productResult.code)
                favoritesCopy.splice(indexId, 1)
                setFavorites(favoritesCopy)
            }}
            src={FavoritesFullIcon}
            alt=""
        />
    )
    const favoritesButtonBoolean = !booleanFavorites
        ? favoritesNoneIcon
        : favoritesPresentIcon

    const favoritesButton = <div>{favoritesButtonBoolean}</div>

    const brands = (
        <p className="product__name">{productResult.product.brands}</p>
    )

    const picture = (
        <img
            className="productPict"
            src={productResult.product.image_url}
            alt="image produit"
        />
    )

    const calories = <>{productResult.product.nutriments['energy-kcal']}</>
    const caloriesUnit = (
        <>{productResult.product.nutriments['energy-kcal_unit']}</>
    )
    const caloriesPer100g = (
        <p className="product__caloriesPer100">
            {calories} {caloriesUnit} /100g{' '}
        </p>
    )

    const nutriscoreA = productResult.product.nutrition_grade_fr
    const nutriscoreB = productResult.product.nutrition_grade_fr
    const nutriscoreC = productResult.product.nutrition_grade_fr
    const nutriscoreD = productResult.product.nutrition_grade_fr
    const nutriscoreE = productResult.product.nutrition_grade_fr

    const nutriscoreATagImg = (
        <img src={NutriscorPictA} alt="image nutriscore A" />
    )
    const nutriscoreBTagImg = (
        <img src={NutriscorPictB} alt="image nutriscore B" />
    )
    const nutriscoreCTagImg = (
        <img src={NutriscorPictC} alt="image nutriscore C" />
    )
    const nutriscoreDTagImg = (
        <img src={NutriscorPictD} alt="image nutriscore D" />
    )
    const nutriscoreETagImg = (
        <img src={NutriscorPictE} alt="image nutriscore E" />
    )
    const nutriscoreUnknownTagImg = (
        <img src={NutriscorPictUnknow} alt="image nutriscore inconnu" />
    )

    const nutriscorePict =
        nutriscoreA == 'a'
            ? nutriscoreATagImg
            : nutriscoreB == 'b'
            ? nutriscoreBTagImg
            : nutriscoreC == 'c'
            ? nutriscoreCTagImg
            : nutriscoreD == 'd'
            ? nutriscoreDTagImg
            : nutriscoreE == 'e'
            ? nutriscoreETagImg
            : nutriscoreUnknownTagImg

    const caloriesDataPresent = productResult.product.nutriments[
        'energy-kcal'
    ] ? (
        caloriesPer100g
    ) : (
        <p className="product__caloriesPer100">
            Information sur les calories non disponibles
        </p>
    )

    const dataProduct = (
        <>
            {brands}
            {picture}
            {caloriesDataPresent}
            {nutriscorePict}
        </>
    )

    return (
        <>
            <>{favoritesButton}</>
            <>{dataProduct}</>
        </>
    )
}

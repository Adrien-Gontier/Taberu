import React, { useContext } from 'react'
import OneFavorites from '../components/OneFavorites';
import FavoritesContext from '../context/FavoritesContext';

export default function Favorites() {

    const { favorites, setFavorites } = useContext(FavoritesContext);

    return (
        <div className="favorites">
            <p className="favorites__title">Listes des produits mis en favories</p>
            {favorites.map((oneFavoritesProduct) => <div key={oneFavoritesProduct.code}><OneFavorites props={oneFavoritesProduct} /></div>)}
        </div>
    )
}
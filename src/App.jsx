import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './assets/sass/App.css'
import Title from './components/Title'
import Navbar from './components/Navbar'
import NameNumberContext from './context/NameNumberContext'
import BarCodeContext from './context/BarCodeContext'
import { useState } from 'react'
import ProductResultContext from './context/ProductResultContext'
import FavoritesContext from './context/FavoritesContext'
import DoubleSearch from './routes/DoubleSearch'
import Product from './routes/Product'
import SearchResult from './routes/SearchResult'
import Favorites from './routes/Favorites'

export default function App() {
    const [nameNumber, setNameNumber] = useState(null)
    const [barCode, setBarCode] = useState(null)
    const [productResult, setProductResult] = useState(null)
    const [favorites, setFavorites] = useState([])

    return (
        <div>
            <BrowserRouter>
                <NameNumberContext.Provider
                    value={{ nameNumber, setNameNumber }}
                >
                    <BarCodeContext.Provider value={{ barCode, setBarCode }}>
                        <ProductResultContext.Provider
                            value={{ productResult, setProductResult }}
                        >
                            <FavoritesContext.Provider
                                value={{ favorites, setFavorites }}
                            >
                                <Title />
                                <Routes>
                                    <Route
                                        path="/"
                                        element={<DoubleSearch />}
                                    />
                                    <Route
                                        path="/product"
                                        element={<Product />}
                                    />
                                    <Route
                                        path="/searchresult"
                                        element={<SearchResult />}
                                    />
                                    <Route
                                        path="/favorites"
                                        element={<Favorites />}
                                    />
                                </Routes>
                                <Navbar />
                            </FavoritesContext.Provider>
                        </ProductResultContext.Provider>
                    </BarCodeContext.Provider>
                </NameNumberContext.Provider>
            </BrowserRouter>
        </div>
    )
}

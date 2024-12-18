import { createContext, useState, useContext, useEffect } from 'react'

const MovieContext = createContext()

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    
    useEffect(() => {
       const storedFavs = localStorage.getItem('favorites');
       if(storedFavs) setFavorites(JSON.parse(storedFavs));
    }, [])
    
    useEffect(() => {
       localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites])
    
    // Rename the method to match the call in MovieCard
    const addToFavorites = (movie) => {
       // Add a check to prevent duplicates
       if (!favorites.some(m => m.id === movie.id)) {
           setFavorites(prev => [...prev, movie]);
       }
    }
    
    const removeFromFavorites = (movieId) => {
       setFavorites(prev => prev.filter(m => m.id !== movieId));
    }
    
    const isFavorite = (movieId) => {
       return favorites.some(m => m.id === movieId);
    }
    
    const value = {
       favorites,
       addToFavorites,
       removeFromFavorites,
       isFavorite
    }
    
    return <MovieContext.Provider value={value}>
       {children}
    </MovieContext.Provider>
}
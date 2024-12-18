import { react } from 'react'
import { useMovieContext } from '../context/MovieContext'
import "../css/MovieCard.css"
import { Link } from 'react-router-dom';

function MovieCard({movie}){
   const {isFavorite, addToFavorites, removeFromFavorites} = useMovieContext();
   const favorite = isFavorite(movie.id);(movie.id);(movie.id);

   function onFavoriteClick(e){
      e.preventDefault();
      if(favorite) removeFromFavorites(movie.id);
      else addToFavorites(movie);
   }
   return <div className='movie-card'>
      
      <Link to={`/movie/${movie.id}`}> 
      <div className='movie-poster'>
         <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
         <div className='movie-overlay'>
            <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>❤</button>
         </div>
      </div>
      </Link>
      <div className='movie-info'>
         <h3>{movie.title}</h3>
         <p>{movie.release_date?.split("-")[0]}</p>
      </div>
      
   </div>
}


export default MovieCard
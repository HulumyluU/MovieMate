
import { useState , useEffect} from 'react';
import MovieCard from '../components/MovieCard';
import { searchMovies, getPopularMovies } from '../services/api';
import "../css/Home.css"
import Footer from '../components/Footer';

function Home({}){
   const [searchQuery, setSearchQuery] = useState('');
   const [movies, setMovies] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const loadPopularMovies = async () => {
         try {
            const popularMovies = await getPopularMovies();
            setMovies(popularMovies);
         } catch (error) {
            setError("Failed to load popular movies...");
         } finally {
            setLoading(false);
         }
      }
      loadPopularMovies();
   }, []) //every time veriables chnage useEffect runs


   const handleSearch = async (e) => {
      e.preventDefault();
      if(!searchQuery.trim()) return;//remove spaces from the strig search
      if(loading) return; //if loading dont make another request
      setLoading(true);
      
      try{
         const searchResults = await searchMovies(searchQuery);
         setMovies(searchResults);
         setError(null); //clear error message if successful search
      }catch (error) {
         setError("Failed to search movies...");
      } finally {
         setLoading(false);
      }
      //setSearchQuery('');
   };


  return <div className='home'>
      <form onSubmit={handleSearch} className='search-form'>
         <input type="text"
          placeholder='Search for movies...'
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)  }
         />
         <button type='submit' className='search-button'>Search</button>
      </form>

      {error && <div className='error-message'>{error}</div>}

      {loading ? <div className='loading'>Loading...</div> : 
      <div className='movies-grid'>
         {movies.map(movie => (
            <MovieCard movie={movie} key={movie.id}/>
         ))}
      </div>}

   </div>

}

export default Home
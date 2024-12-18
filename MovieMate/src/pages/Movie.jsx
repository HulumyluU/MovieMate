import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMovieContext } from '../context/MovieContext';
import "../css/Movie.css";

function Movie() {
    const { favorites, addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [displayAllActors, setDisplayAllActors] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const API_KEY = "275835be3da55af61fc661eb5a1f5a65";
                const BASE_URL = "https://api.themoviedb.org/3";
                
                const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch movie details');
                }
                
                const data = await response.json();
                setMovie(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMovieDetails();
    }, [id]);

    // Handle favorite toggle
    const handleFavoriteToggle = () => {
        if (movie) {
            if (isFavorite(movie.id)) {
                removeFromFavorites(movie.id);
            } else {
                addToFavorites(movie);
            }
        }
    };

    // Format runtime
    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
        return `${hours}h ${remainingMinutes}m`;
    };

    // Get first trailer
    const getTrailerKey = () => {
        if (movie && movie.videos && movie.videos.results) {
            const trailers = movie.videos.results.filter(video => 
                video.type === 'Trailer' && video.site === 'YouTube'
            );
            return trailers.length > 0 ? trailers[0].key : null;
        }
        return null;
    };

    // Get top cast
    const getTopCast = () => {
        if (movie && movie.credits && movie.credits.cast) {
            // Sort by popularity and limit to top 10 if not displaying all
            const sortedCast = movie.credits.cast
                .sort((a, b) => b.popularity - a.popularity)
                .filter(actor => actor.profile_path); // Only include actors with profile pictures

            return displayAllActors ? sortedCast : sortedCast.slice(0, 10);
        }
        return [];
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!movie) return <div>No movie found</div>;

    const trailerKey = getTrailerKey();
    const isFavoriteMovie = isFavorite(movie.id);
    const topCast = getTopCast();

    return (
        <div className="movie-details-container">
            {/* Previous movie header and main content remain the same */}
            <div className="movie-details-container">
            <div className="movie-header">
                <div className="movie-backdrop">
                    <img 
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                        alt={`${movie.title} backdrop`} 
                    />
                    <div className="movie-header-overlay">
                        <h1>{movie.title}</h1>
                        <div className="movie-header-info">
                            <span>{movie.release_date.split('-')[0]}</span>
                            <span>•</span>
                            <span>{formatRuntime(movie.runtime)}</span>
                            <span>•</span>
                            <span>{movie.vote_average.toFixed(1)} / 10</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="movie-main-content">
                <div className="movie-poster-and-actions">
                    <div className="movie-poster">
                        <img 
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                            alt={movie.title} 
                        />
                        <button 
                            className={`favorite-btn ${isFavoriteMovie ? 'active' : ''}`}
                            onClick={handleFavoriteToggle}
                        >
                            {isFavoriteMovie ? '❤️' : '🤍'}
                        </button>
                    </div>
                </div>

                <div className="movie-info">
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>

                    <div className="movie-additional-info">
                        <div className="info-grid">
                            <div>
                                <h3>Genres</h3>
                                <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
                            </div>
                            <div>
                                <h3>Language</h3>
                                <p>{movie.original_language.toUpperCase()}</p>
                            </div>
                            <div>
                                <h3>Rating</h3>
                                <p>{movie.vote_average.toFixed(1)} / 10 
                                    <span className="vote-count">({movie.vote_count} votes)</span>
                                </p>
                            </div>
                        </div>
                    </div>

                    {trailerKey && (
                        <div className="movie-trailer">
                            <h2>Trailer</h2>
                            <iframe 
                                width="560" 
                                height="315" 
                                src={`https://www.youtube.com/embed/${trailerKey}`} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                </div>
            </div>
        </div>
            {/* New Actors Section */}
            <div className="movie-actors-section">
                <h2>Top Cast</h2>
                <div className="actors-grid">
                    {topCast.map(actor => (
                     <a target="_blank" href={`https://en.wikipedia.org/wiki/${actor.name}`}>
                        <div key={actor.id} className="actor-card">
                            <img 
                                src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} 
                                alt={actor.name} 
                                className="actor-image"
                            />
                              <div className="actor-info">
                                 <h3>{actor.name}</h3>
                                 <p>Character: {actor.character}</p>
                              </div>
                        </div>
                     </a>
                    ))}
                </div>
                {movie.credits.cast.length > 10 && (
                    <button 
                        className="show-more-actors-btn"
                        onClick={() => setDisplayAllActors(!displayAllActors)}
                    >
                        {displayAllActors ? 'Show Less' : `Show All ${movie.credits.cast.length} Actors`}
                    </button>
                )}
            </div>
        </div>
    );
}

export default Movie;

















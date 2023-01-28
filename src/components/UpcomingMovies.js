import { MenuItem, Select } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import MovieCard from './MovieCard';

const UpcomingMovies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('te');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        setLoading(true);
    };

    // Get current date
    const currentDate = new Date();

    // Format date to yyyy-mm-dd
    const formattedDate = currentDate.toISOString().slice(0, 10);

    const fetchData = useCallback(async (page) => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=afcc4e756d500720208345094fe13a77&language=en-US&sort_by=release_date.asc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${formattedDate}&with_original_language=${language}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }, [language,formattedDate]);

    const fetchAllPages = useCallback(async () => {
        let page = 1;
        let totalPages = 1; 
        let movieData = [];
        while (page <= totalPages) {
            let data = await fetchData(page);
            totalPages = data.total_pages;
            movieData = movieData.concat(data.results);
            page++;
        }
        setMovies(movieData);
    }, [fetchData, setMovies]);

    useEffect(() => {
        fetchAllPages()
            .then((data) => {

                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [language, fetchAllPages]);

    // ...
    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    return (
        <div className="movie-page">
            <div className="container">
                <div className="header">
                    <h1 className="heading">Upcoming</h1>
                    <span className="count-pill">
                        {movies.length} {movies.length === 1 ? "Movie" : "Movies"}
                    </span>
                </div>
                <Select
                    labelId="language-select-label"
                    id="language-select"
                    value={language}
                    onChange={handleLanguageChange}
                >
                    <MenuItem value="te">Telugu</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="hi">Hindi</MenuItem>
                </Select>
                {movies.length > 0 ? (
                    <div className="movie-grid" style={{ margin: "20px 0" }}>
                        {movies.map((movie) => (
                            <MovieCard movie={movie} type="watchList" key={movie.id} />
                        ))}
                    </div>
                ) : (
                    <h2 className="no-movies">No Movies In Watch List</h2>
                )}
            </div>
        </div>
    );
}

export default UpcomingMovies;
import { MenuItem, Select } from '@material-ui/core';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from './LoadingSpinner';
import MovieCard from './MovieCard';

const AllTimeTopMovies = () => {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [language, setLanguage] = useState('te');

    const handleLanguageChange = (event) => {
        setLanguage(event.target.value);
        setLoading(true);
      };


    const fetchData = useCallback(async (page) => {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=afcc4e756d500720208345094fe13a77&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=1000&with_original_language=${language}&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }, [language]);

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
    }, [language,fetchAllPages]);

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
                    <h1 className="heading">All Time</h1>
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
                    <h2 className="no-movies">To Be Updated</h2>
                )}
            </div>
        </div>
    );
}

export default AllTimeTopMovies;
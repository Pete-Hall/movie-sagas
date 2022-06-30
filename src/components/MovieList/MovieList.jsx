import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

function MovieList() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    const handleClick = (arg) => { // arg is just a parameter. down below, the movie.id becomes the parameter we're passing in this function
        console.log('in handleClick:', arg); // how to pass an paramenter in the onClick function https://upmostly.com/tutorials/pass-a-parameter-through-onclick-in-react
        //dispatch({type: 'MOVIE_INFO', payload: arg}); // send this to the root saga to start that flow - don't need this because on page load in details it sends the same dispatch
        history.push(`/details/${arg}`); // send us to the details page for the specific movie we clicked on
        // this also works for params https://stackoverflow.com/questions/40947650/axios-get-in-url-works-but-with-second-parameter-as-object-it-doesnt
    }

    return (
        <main>
            <h1>MovieList</h1>
            <h2><a href="/#/addmovie">Add a movie!</a></h2>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div key={movie.id} >
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} onClick={() => handleClick(movie.id)}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;
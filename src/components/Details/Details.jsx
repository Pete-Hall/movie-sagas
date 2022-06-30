import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Details() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);


    // on click, history.push to go to /details/:id (i think?) GET call in /details to display the movie info based on the id of the movie clicked 
    return (
      <div>
        <h3>Details</h3>
      </div>
    );
}

export default Details;
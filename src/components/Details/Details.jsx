import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Details() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    // useEffect(() => {
    //     dispatch({ type: 'FETCH_MOVIES' });
    // }, []);


    return (
      <div>
        <h3>Details</h3>
      </div>
    );
}

export default Details;
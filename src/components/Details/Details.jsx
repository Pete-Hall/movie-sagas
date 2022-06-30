import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Details() {

    const dispatch = useDispatch();
    const history = useHistory();
    const movies = useSelector(store => store.movies);
  
    const goBack = () => {
      console.log('in goBack');
      history.push('/');
    }


    return (
      <div>
        <h3>Details</h3>
        <button onClick={goBack}>Go back</button>
      </div>
    );
}

export default Details;
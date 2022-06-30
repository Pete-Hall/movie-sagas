import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Details() {

    const dispatch = useDispatch();
    const history = useHistory();
    const specificMovie = useSelector(store => store.specificMovie);
  
    const goBack = () => {
      console.log('in goBack');
      history.push('/');
    }

    return (
      <div>
        <h3>Details</h3>
        <button onClick={goBack}>Go back</button>
        {/* <p>{JSON.stringify(specificMovie)}</p> */}
        <h3>{specificMovie[0].title}</h3>
        <img src={specificMovie[0].poster} />
        <p>{specificMovie[0].description}</p>
        <h4>Genre(s)</h4>
        {specificMovie.map(movie => (
          <p>{movie.name}</p>
        ))}
      </div>
    );
}

export default Details;
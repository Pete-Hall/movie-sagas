import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

function Details() {

    const dispatch = useDispatch();
    const history = useHistory();
    const specificMovie = useSelector(store => store.specificMovie);
  
    const goBack = () => {
      console.log('in goBack');
      history.push('/');
    }

    let { id } = useParams();
    
    useEffect(() => {
      console.log(id);
      dispatch({type: 'MOVIE_INFO', payload: id}); // send a dispatch to the root saga with the id from the params as the payload to start that flow
    }, []);

    // it will re-render if any variables change that we're using
    return (
      <div>
        {/* <h1>{id}</h1> */}
        <h3>Details</h3>
        {specificMovie.length === 0 ? 
        <p>Loading . . .</p> :
        <div><button onClick={goBack}>Go back</button>
        <h3>{specificMovie[0].title}</h3>
        <img src={specificMovie[0].poster} />
        <p>{specificMovie[0].description}</p>
        <h4>Genre(s)</h4>
        {specificMovie.map((movie, i )=> (
          <p key={i}>{movie.name}</p>
        ))}</div>}
      </div>
    );
}

export default Details;
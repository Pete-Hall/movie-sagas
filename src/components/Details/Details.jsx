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
      dispatch({type: 'MOVIE_INFO', payload: id});
    }, []);

    
    // get call that looks thru the movies with that id. I can access the url param

    return (
      <div>
        <h1>{id}</h1>
        <h3>Details</h3>
        <button onClick={goBack}>Go back</button>
        {/* <p>{JSON.stringify(specificMovie)}</p> */}
        <h3>{specificMovie[0].title}</h3>
        <img src={specificMovie[0].poster} />
        <p>{specificMovie[0].description}</p>
        <h4>Genre(s)</h4>
        {specificMovie.map((movie, i )=> (
          <p key={i}>{movie.name}</p>
        ))}
      </div>
    );
}

export default Details;
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';

function AddMovie() {

    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres)

    let [description, setDescription] = useState('');
    let [title, setTitle] = useState('');
    let [poster, setPoster] = useState('');

    useEffect(() => {
      dispatch({ type: 'GET_GENRES' });
    }, []);

    const changeDescription = (e) => {
      setDescription(e.target.value);
    }

    const changeTitle = (e) => {
      setTitle(e.target.value);
    }

    const changePoster = (e) => {
      setPoster(e.target.value);
    }

    const goBack = () => {
      console.log('in goBack');
      history.push('/');
    }

    const saveMovie = () => {
      let newMovie = {
        title,
        poster,
        description
      };
      console.log('in saveMovie:', newMovie);
    }
    
    // TODO
    // get call to add genres to dropdown (map through them)
    // look at notes on how to capture dropdown selections
    // look at notes on how to clear inputs

    return (
      <div>
        <h3>Add a movie!</h3>
        <input onChange={changeTitle}type="text" placeholder="Movie Title" />
        <br/>
        <input onChange={changePoster} type="text" placeholder="Poster URL" />
        <br/>
        <textarea onChange={changeDescription} placeholder="Movie Description"/>
        <br/>
        <select>
          {genres.map(genre => (
            <option key={genre.id}>{genre.name}</option>
          ))}
        </select>
        <br/>
        <button onClick={saveMovie}>Save</button>
        <button onClick={goBack}>Cancel</button>
      </div>
    );
}

export default AddMovie;
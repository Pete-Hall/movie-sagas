import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory} from 'react-router-dom';

function AddMovie() {

    const dispatch = useDispatch();
    const history = useHistory();
    const genres = useSelector(store => store.genres)

    useEffect(() => {
      dispatch({ type: 'GET_GENRES' });
    }, []);

    let [description, setDescription] = useState('');
    let [genre_id, setGenre_id] = useState('1'); // I want this to be the id of the first genre from the database vs hard coding it
    let [title, setTitle] = useState('');
    let [poster, setPoster] = useState('');

    const changeDescription = (e) => {
      setDescription(e.target.value);
    }

    const changeGenre = (e) => {
      setGenre_id(e.target.value);
    }

    const changeTitle = (e) => {
      setTitle(e.target.value);
    }

    const changePoster = (e) => {
      setPoster(e.target.value);
    }

    const goBack = () => {
      // console.log('in goBack');
      history.push('/');
    }

    const saveMovie = () => {
      let newMovie = {
        title,
        poster,
        description,
        genre_id
      };
      console.log('in saveMovie:', newMovie);
      dispatch({type: 'SAVE_MOVIE', payload: newMovie});
      history.push('/');
      
    }
    

    return (
      <div>
        <h3>Add a movie!</h3>
        <input onChange={changeTitle}type="text" placeholder="Movie Title" />
        <br/>
        <input onChange={changePoster} type="text" placeholder="Poster URL" />
        <br/>
        <textarea onChange={changeDescription} placeholder="Movie Description"/>
        <br/>
        <select onChange={changeGenre}>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
        <br/>
        <button onClick={saveMovie}>Save</button>
        <button onClick={goBack}>Cancel</button>
      </div>
    );
}

export default AddMovie;
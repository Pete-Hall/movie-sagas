import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('MOVIE_INFO', getMovie);
    yield takeEvery('GET_GENRES', getGenres);
    yield takeEvery('SAVE_MOVIE', addMovie);
    yield takeEvery('DELETE_MOVIE_SAGA', deleteMovieSaga)
}

function* addMovie(action) {
    console.log('in addMovie:', action.payload);
    try {
        const response = yield axios.post('api/movie', action.payload);
        console.log('response in addMovie:', response);
        yield put({type: 'FETCH_MOVIES'}); // perform a get call to update the list of movies
    } catch(err) {
        console.log(err);
        alert('error adding movie');
    }
}

function* deleteMovieSaga(action) {
    console.log('in deleteMovieSaga:', action.payload);
    try {
        const response = yield axios.delete(`api/movie/delete/${action.payload}`);
        console.log(response);
        yield put({type: 'FETCH_MOVIES'});
    } catch(err) {
        console.log(err);
        alert('error deleting movie');
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie'); 
        console.log('data in fetchAllMovies:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch(err) {
        console.log(err);
        alert('get all error');
    }  
}

// gets all genres from the DB (currently used in AddMovie)
function* getGenres() {
    try {
        const response = yield axios.get('/api/genre');
        console.log('data in getGenres:', response.data);
        yield put({type: 'SET_GENRES', payload: response.data});
    } catch(err) {
        console.log(err);
        alert('get genres error');
    }
}

// get specific movie details form the DB to show all info on the clicked movie
function* getMovie(action) {
    console.log('in getMovie', action.payload); // action.payload returns the id for the specific movie
    try {
        const response = yield axios.get(`api/movie/details/${action.payload}`); // send the action.payload (id) to the server as req.params
        console.log('data in getMovie:', response.data);
        yield put({type: 'SPECIFIC_MOVIE', payload: response.data}); // send the response from the DB to SPECIFIC_MOVIE aka the function specificMovie
    } catch(err) {
        console.log(err);
        alert('get movie error');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store all movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store specific movie info returned from the server (details and genres)
const specificMovie = (state = [], action) => {
    if(action.type === 'SPECIFIC_MOVIE') {
        return action.payload;
    } else {
        return state;
    }
}

// Used to store the movie genres for the AddMovie dropdown
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        specificMovie
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

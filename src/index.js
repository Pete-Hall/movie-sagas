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
}

function* addMovie(action) {
    console.log(action.payload);
    try {
        const response = yield axios.post('api/movie', action.payload);
        console.log(response);
    } catch(err) {
        console.log(err);
        alert('error adding movie');
    }
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie'); 
        console.log('get all:', movies.data);
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch {
        console.log('get all error');
    }  
}

function* getGenres() {
    try {
        const response = yield axios.get('/api/genre');
        console.log('get all genres:', response.data);
        yield put({type: 'SET_GENRES', payload: response.data});
    } catch {
        console.log('get genres error');
    }
}

function* getMovie(action) {
    console.log('in getMovie', action.payload); // action.payload returns the id for the specific movie
    try {
        const response = yield axios.get(`api/movie/details/${action.payload}`);
        console.log('get movie:', response.data);
        yield put({type: 'SPECIFIC_MOVIE', payload: response.data});
    } catch {
        console.log('get movie error');
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store specific move info returned from the server
const specificMovie = (state = ['placeholder'], action) => { // added a placeholder state because I was getting a type error (could not read properties of undefined) when clicking on a movie. this doesn't seem like the right way to do it :/. The error I was getting seemed to be a race condition 
    if(action.type === 'SPECIFIC_MOVIE') {
        // state = action.payload; // overwrite the current state. 
        return action.payload;
    } else {
        return state;
    }
}

// Used to store the movie genres
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

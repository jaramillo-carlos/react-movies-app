import { put, call, takeLatest } from 'redux-saga/effects';
import {
  SEARCH_MOVIE_START,
  SEARCH_MOVIE_ERROR,
  SEARCH_MOVIE_COMPLETE,
  SEARCH_MOVIE_BY_ID_START,
  SEARCH_MOVIE_BY_ID_ERROR,
  SEARCH_MOVIE_BY_ID_COMPLETE,
} from '../../consts/actionTypes';
import { apiCall } from '../api'

export function* searchMovie({ payload }) {
  try {
    const results = yield call(apiCall, `&s=${payload.movieName}`, null, null, 'GET')
    yield put({ type: SEARCH_MOVIE_COMPLETE, results })
  } catch (error) {
    yield put({ type: SEARCH_MOVIE_ERROR, error })
  }
}

export function* searchMovieById({ payload }) {
  try {
    const movie = yield call(apiCall, `&i=${payload.movieId}`, null, null, 'GET')
    yield put({ type: SEARCH_MOVIE_BY_ID_COMPLETE, movie })
  } catch (error) {
    yield put({ type: SEARCH_MOVIE_BY_ID_ERROR, error })
  }
}

// export to put in watcher
// and be sagas stay listen to be called
export default function* search() {
  // to listen SEARCH_MOVIE_START action
  // and when called, call searchMovie Function
  yield takeLatest(SEARCH_MOVIE_START, searchMovie);
  yield takeLatest(SEARCH_MOVIE_BY_ID_START, searchMovieById);
}
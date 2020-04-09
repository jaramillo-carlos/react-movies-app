import { put, call, takeLatest } from 'redux-saga/effects';
import { 
  SEARCH_MOVIE_START, 
  SEARCH_MOVIE_ERROR, 
  SEARCH_MOVIE_COMPLETE
} from '../../consts/actionTypes';

export function* searchMovie({payload}) {
  try {
    console.log('start saga', payload)
  } catch (error) {

  }
}
// export to put in watcher
// and be sagas stay listen to be called
export default function* search() {
  // to listen SEARCH_MOVIE_START action
  // and when called, call searchMovie Function
  yield takeLatest(SEARCH_MOVIE_START, searchMovie);
}
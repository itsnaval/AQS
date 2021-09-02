import { all } from 'redux-saga/effects';
import userSagas from './users';
import twitterSaga from './twitterSaga';

export default function* rootSaga() {
  yield all([...userSagas, ...twitterSaga]);
}

import { all } from 'redux-saga/effects';
// import PostSaga from './post/saga';

export default function* rootSaga() {
  yield all([
    // PostSaga(),
  ]);
}

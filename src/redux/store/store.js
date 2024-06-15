// store.js

import { applyMiddleware, compose, createStore } from 'redux';
import { persistCombineReducers, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk'; // Import redux-thunk
import rootReducer from '../reducers';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const authPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'profile', 'basket', 'checkout']
};

const configureStore = () => {
  const store = createStore(
    persistCombineReducers(authPersistConfig, rootReducer),
    composeEnhancer(applyMiddleware(thunk, sagaMiddleware)) // Apply thunk middleware here
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  return { store, persistor };
};

export default configureStore;

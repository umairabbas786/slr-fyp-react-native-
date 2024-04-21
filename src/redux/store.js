import {legacy_createStore as createStore} from 'redux';
import reducers from './reducers/index';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'main_root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer);

const Persistor = persistStore(store);

export {Persistor};
export default store;

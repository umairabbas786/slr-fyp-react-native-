/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import store, { Persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from 'react-redux';

const RNRedux = () => (
    <Provider store={store}>
        <PersistGate persistor={Persistor}>
            <App />
        </PersistGate>
    </Provider>
)

AppRegistry.registerComponent(appName, () => RNRedux);

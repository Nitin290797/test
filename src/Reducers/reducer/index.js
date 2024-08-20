import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Data from './Data';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['Data']
}
// Root Reducer 
const allReducers = combineReducers({
    // ALL REDUCERS 
    Data: Data,
})

export default persistReducer(persistConfig, allReducers);
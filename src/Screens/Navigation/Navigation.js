import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { persistStore } from 'redux-persist';
import { createStore } from 'redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import reducer from '../../Reducers/reducer';
import FirstPage from '../Component/FirstPage';

const Stack = createStackNavigator();
const store = createStore(reducer);
const persistor = persistStore(store)


const Navigation = () => {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <NavigationContainer independent={true}>
                    <Stack.Navigator initialRouteName="FirstPage" screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="FirstPage" component={FirstPage} />
                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}

export default Navigation
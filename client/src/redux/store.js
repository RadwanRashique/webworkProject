// manage application's state globally and use Redux Toolkit's features for improved development
import { configureStore } from '@reduxjs/toolkit'
//combineReducer function is used to combine multiple reducers into a single reducer object.
import { combineReducers } from 'redux'
import { alertsSlice } from './alertsSlice';

const rootReducer = combineReducers({

    alerts: alertsSlice.reducer
})

const store = configureStore({
    reducer: rootReducer
})

export default store
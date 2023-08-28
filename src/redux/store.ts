//  ======
//  Redux store, with added redux-persist local storage functionality
//  ======

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import sessionsReducer from "./sessionsReducer";
import commonReducer from "./commonReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  sessions: sessionsReducer,
  common: commonReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

import { combineReducers, configureStore, EnhancedStore } from '@reduxjs/toolkit'
import createSagaMiddleware from '@redux-saga/core';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import saga from './saga';

import roomsSlice from './rooms';
import tagsSlice from './tags';
import categoriesSlice from './categories';

let sagaMiddleware = createSagaMiddleware();

const persistConfig = {
	key: 'doceo',
	version: 1,
	storage,
}

const persistedReducer = persistReducer(persistConfig, combineReducers({
	rooms: roomsSlice.reducer,
	tags: tagsSlice.reducer,
	categories: categoriesSlice.reducer
}));

type Store = EnhancedStore & {
	_persistor: Persistor
}

// config the store
const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware({
			thunk: false,
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
			},
		}),
		sagaMiddleware
	]
})

sagaMiddleware.run(saga);

const storeWithPersistor: Store = {
	...store,
	_persistor: persistStore(store)
}

export type RootState = ReturnType<typeof persistedReducer>
export type Payload<T> = { payload: T }
export type PayloadWithType<T> = { type: string, payload: T }

export default storeWithPersistor
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { feedApi } from '../modules/feed/api/repository';
import { profileApi } from '../modules/profile/api/repository';
import { authApi } from '../modules/auth/api/repository';
import { authSlice } from '../modules/auth/service/slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'conduit',
  storage,
  whitelist: [authSlice.name]
}

const persistentReducer = persistReducer(
  persistConfig,
  combineReducers({
    [feedApi.reducerPath]: feedApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [authApi.reducerPath]: authApi.reducer,
  }),
)

export const store = configureStore({
  reducer:  persistentReducer,
  middleware: (curryGetDefaultMiddleware) =>
  curryGetDefaultMiddleware({
    serializableCheck: false,
  }).concat(
    feedApi.middleware, profileApi.middleware, authApi.middleware
    ),
  })

  export const persistedStore = persistStore(store)

  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;
  
  export const useAppDispatch: () => AppDispatch = useDispatch
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
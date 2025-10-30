// src/store/store.ts
import { applyMiddleware, createStore, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import  { thunk, type ThunkMiddleware } from "redux-thunk";
import rootReducer, { type RootState } from "../reducers/rootReducer";
import persistConfig from "./persistConfig";
import loggerMiddleware from "./middleware";
import type { AuthActionTypes } from "../types/authTypes"; // Example — import your main action types
 // Example — import your main action types

// Combine persist reducer with typing
const persistedReducer = persistReducer(persistConfig, rootReducer as any);

// Setup middleware
const middlewares = [thunk as unknown as ThunkMiddleware<RootState, AuthActionTypes>];

// Enable logger only in development
if (import.meta.env.MODE === "development") {
  middlewares.push(loggerMiddleware);
}

// Enable Redux DevTools Extension (only in browser)
const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Create store
export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);

// Create persistor
export const persistor = persistStore(store);

// ✅ Export typed hooks for later use
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
export type { RootState };

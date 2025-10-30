// src/redux/selectors/authSelectors.ts
// src/redux/selectors/authSelectors.ts
import type { RootState } from "../reducers/rootReducer";

/**
 * Selects whether the user is authenticated.
 * This can depend on `auth.token`, `auth.user`, or a boolean flag like `auth.isAuthenticated`
 * depending on how your auth reducer is implemented.
 */
export const selectIsAuthenticated = (state: RootState): boolean => {
  return Boolean(state.auth?.isAuthenticated || state.auth?.token);
};

/**
 * Selects the current authenticated user object, if available.
 */
export const selectCurrentUser = (state: RootState) => state.auth?.user;

/**
 * Selects the authentication token.
 */
export const selectAuthToken = (state: RootState) => state.auth?.token;

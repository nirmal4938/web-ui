import type { Middleware } from "redux";

const loggerMiddleware: Middleware = (store) => (next) => (action) => {
  if (import.meta.env.MODE === "development") {
    console.log("Dispatching:", action);
  }
  return next(action);
};

export default loggerMiddleware;

import storage from "redux-persist/lib/storage";
import type { PersistConfig } from "redux-persist";
import type { RootState } from "../reducers/rootReducer";

const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

export default persistConfig;

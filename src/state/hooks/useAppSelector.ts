import { type TypedUseSelectorHook, useSelector } from "react-redux";
import type { RootState } from "../reducers/rootReducer";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

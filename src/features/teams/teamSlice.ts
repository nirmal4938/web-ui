import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type Team = {
  id: string;
  name: string;
  players: string[];
};

type TeamState = {
  teams: Team[];
  loading: boolean;
  error: string | null;
};

const initialState: TeamState = {
  teams: [],
  loading: false,
  error: null,
};

const teamSlice = createSlice({
  name: 'teams',
  initialState,
  reducers: {
    setTeams(state, action: PayloadAction<Team[]>) {
      state.teams = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setTeams, setLoading, setError } = teamSlice.actions;

export default teamSlice.reducer; // ← This is the reducer being imported as `teamReducer`

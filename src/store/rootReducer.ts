import { combineReducers } from '@reduxjs/toolkit';
// import teamReducer from '@/features/teams/teamSlice';
import teamReducer from '@features/teams/teamSlice'
// import other slices here

const rootReducer = combineReducers({
  teams: teamReducer,
  // add more slices
});

export default rootReducer;

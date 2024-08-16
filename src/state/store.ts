import { configureStore, createReducer } from "@reduxjs/toolkit";
import userInputs from "./user-inputs";
import {useDispatch} from 'react-redux';

const store = configureStore({
  reducer: {
    userInputs: userInputs.reducer,
  },
});



export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export a use app dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;


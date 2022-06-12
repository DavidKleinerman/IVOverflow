import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth-slice";
import answersSlice from "./slices/answers-slice";
import questionsSlice from "./slices/questions-slice";
//import questionSlice from "./slices/question-slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    answers: answersSlice.reducer,
    questions: questionsSlice.reducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const questionsSlice = createSlice({
  name: "questions",
  initialState: { questions: [], nextPage: 2 },
  reducers: {
    addNewQuestion(state, action) {
      state.questions = [action.payload, ...state.questions];
    },
    AddNewQuestionsAfter(state, action) {
      state.questions = [...state.questions, ...action.payload];
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
    resetQuestions(state, action) {
      state.questions = [];
    },
  },
});

export const questionsActions = questionsSlice.actions;

export default questionsSlice;

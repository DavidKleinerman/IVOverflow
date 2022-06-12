import { createSlice } from "@reduxjs/toolkit";

const answersSlice = createSlice({
  name: "answers",
  initialState: { answers: [], nextPage: 2 },
  reducers: {
    addNewAnswer(state, action) {
      state.answers = [action.payload, ...state.answers];
    },
    AddNewAnswersAfter(state, action) {
      state.answers = [...state.answers, ...action.payload];
    },
    setNextPage(state, action) {
      state.nextPage = action.payload;
    },
    resetAnswers(state, action) {
      state.answers = [];
    },
  },
});

export const answersActions = answersSlice.actions;

export default answersSlice;

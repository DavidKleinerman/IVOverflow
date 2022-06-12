import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import QuestionItem from "./QuestionItem";
import Button from "../UI/Button";
import useStepPagination from "../../hooks/useStepPagination";
import { questionsActions } from "../../store/slices/questions-slice";
import { answersActions } from "../../store/slices/answers-slice";

const QuestionsList = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions.questions);
  const { showMore, moreItemsHandler, isLoading, error } = useStepPagination(
    "http://localhost:9000/questions/get-questions",
    "questions",
    questionsActions.AddNewQuestionsAfter,
    questionsActions.setNextPage,
    (state) => state.questions.nextPage,
    questionsActions.resetQuestions
  );

  useEffect(() => {
    dispatch(answersActions.resetAnswers());
    dispatch(answersActions.setNextPage(2));
  }, [dispatch]);

  let extraMessage = "";

  if (error) {
    extraMessage = error.message;
  } else if (isLoading) {
    extraMessage = "Loading...";
  }

  return (
    <Fragment>
      <div>
        <ul>
          {questions.map((q) => (
            <QuestionItem
              key={q._id}
              title={q.title}
              content={q.content}
              author={q.author}
              createdAt={q.createdAt}
              tags={q.tags}
              id={q._id}
            />
          ))}
        </ul>
      </div>
      <h3>{extraMessage}</h3>
      <div>
        {showMore && (
          <Button config={{ click: moreItemsHandler, name: "Show More" }} />
        )}
      </div>
    </Fragment>
  );
};

export default QuestionsList;

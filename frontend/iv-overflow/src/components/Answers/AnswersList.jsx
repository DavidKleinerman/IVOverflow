import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import AnswerItem from "./AnswerItem";
import useStepPagination from "../../hooks/useStepPagination";
import Button from "../UI/Button";
import { answersActions } from "../../store/slices/answers-slice";
import { questionsActions } from "../../store/slices/questions-slice";

const AnswersList = () => {
  const dispatch = useDispatch();
  const { questionId } = useParams();
  const answers = useSelector((state) => state.answers.answers);
  const questionsNextPage = useSelector((state) => state.questions.nextPage);
  const { showMore, moreItemsHandler, isLoading, error } = useStepPagination(
    "http://localhost:9000/answers/get-question-answer/" + questionId,
    "answers",
    answersActions.AddNewAnswersAfter,
    answersActions.setNextPage,
    (state) => state.answers.nextPage,
    answersActions.resetAnswers
  );

  useEffect(() => {
    if (questionsNextPage === 2) {
      dispatch(questionsActions.resetQuestions());
    }
  });

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
          {answers.map((a) => (
            <AnswerItem
              key={a._id}
              title={a.title}
              content={a.content}
              author={a.author}
              createdAt={a.createdAt}
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

export default AnswersList;

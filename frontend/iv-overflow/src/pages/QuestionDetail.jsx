import { useEffect } from "react";
import useLogout from "../hooks/useLogout";
import FullQuestion from "../components/Questions/FullQuestion";
import AnswersHolder from "../components/Answers/AnswersHolder";

const QuestionDetail = () => {
  const { checkExpiration } = useLogout();

  useEffect(() => {
    checkExpiration();
  }, [checkExpiration]);

  return (
    <div>
      <FullQuestion />
      <AnswersHolder />
    </div>
  );
};

export default QuestionDetail;

import { Fragment, useEffect } from "react";
import QuestionsList from "../components/Questions/QuestionsList";
import useLogout from "../hooks/useLogout";

const AllQuestions = () => {
  const { checkExpiration } = useLogout();
  useEffect(() => {
    checkExpiration();
  }, [checkExpiration]);

  return (
    <Fragment>
      <QuestionsList />
    </Fragment>
  );
};

export default AllQuestions;

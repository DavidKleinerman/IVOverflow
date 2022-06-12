import { Fragment, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import NavBar from "../components/NavBar/NavBar";
import QuestionForm from "../components/Questions/QuestionForm";

const QuestionsMain = () => {
  const { checkExpiration } = useLogout();
  useEffect(() => {
    checkExpiration();
  }, [checkExpiration]);
  return (
    <Fragment>
      <NavBar />
      <QuestionForm />
      <Outlet />
    </Fragment>
  );
};

export default QuestionsMain;

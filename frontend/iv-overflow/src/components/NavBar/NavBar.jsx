import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import Button from "../UI/Button";
import useLogout from "../../hooks/useLogout";
import { answersActions } from "../../store/slices/answers-slice";
import { questionsActions } from "../../store/slices/questions-slice";

const NavBar = () => {
  const dispatch = useDispatch();
  const { logout } = useLogout();

  const logoutHandler = () => {
    dispatch(answersActions.resetAnswers());
    dispatch(answersActions.setNextPage(2));
    dispatch(questionsActions.resetQuestions());
    dispatch(questionsActions.setNextPage(2));
    logout();
  };

  return (
    <header>
      <NavLink to="/">
        <h1>Logo</h1>
      </NavLink>
      <SearchBar />
      <Button config={{ name: "Ask a Question" }} />
      <Button config={{ name: "Log Out", click: logoutHandler }} />
    </header>
  );
};

export default NavBar;

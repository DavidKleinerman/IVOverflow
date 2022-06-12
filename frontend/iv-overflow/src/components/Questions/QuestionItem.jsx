import TagsList from "../Tags/TagsList";
import { NavLink } from "react-router-dom";

const QuestionItem = (props) => {
  return (
    <li>
      <NavLink to={"/questions/question-detail/" + props.id}>
        <div>
          <h2>{props.title}</h2>
        </div>
        <div>
          <p>{props.content}</p>
        </div>
        <div>
          <TagsList tags={props.tags} />
        </div>
        <div>
          <h4>
            created: {props.createdAt} by: {props.author}
          </h4>
        </div>
      </NavLink>
    </li>
  );
};

export default QuestionItem;

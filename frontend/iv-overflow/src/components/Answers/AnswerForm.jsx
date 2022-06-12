import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { answersActions } from "../../store/slices/answers-slice";
import useInput from "../../hooks/useInput";

import useHTTP from "../../hooks/useHTTP";
import Button from "../UI/Button";

const AnswerForm = () => {
  const dispatch = useDispatch();
  const [title, changeTitle, resetTitle] = useInput();
  const [content, changeContent, resetContent] = useInput();
  const { questionId } = useParams();
  const { isLoading, error, sendRequest } = useHTTP();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let data = {
      title: title,
      content: content,
      questionId,
    };
    const config = {
      data: data,
      url: "http://localhost:9000/answers/answer",
      method: "post",
      headers: {},
    };
    const resHandler = (res) => {
      dispatch(answersActions.addNewAnswer(res.data.answer));
    };

    await sendRequest(config, resHandler, true);

    resetContent();
    resetTitle();
  };

  let extraMessage = "";

  if (error) {
    extraMessage = error.message;
  } else if (isLoading) {
    extraMessage = "Loading...";
  }

  return (
    <form onSubmit={onSubmitHandler}>
      <div>
        <h1>Post an Answer</h1>
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          required
          onChange={changeTitle}
          value={title}
        />
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          rows="4"
          cols="50"
          required
          onChange={changeContent}
          value={content}
        />
      </div>
      <div>
        <Button config={{ name: "Post Answer", type: "submit" }} />
      </div>
      <h3>{extraMessage}</h3>
    </form>
  );
};

export default AnswerForm;

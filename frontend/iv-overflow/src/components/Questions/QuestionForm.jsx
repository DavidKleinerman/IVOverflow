// import { useRef } from "react";
import { useDispatch } from "react-redux";
import { questionsActions } from "../../store/slices/questions-slice";
import useHTTP from "../../hooks/useHTTP";
import Button from "../UI/Button";
import useInput from "../../hooks/useInput";

const QuestionForm = () => {
  const dispatch = useDispatch();
  // const titleRef = useRef();
  // const contentRef = useRef();
  // const tagsRef = useRef();
  const [title, changeTitle, resetTitle] = useInput();
  const [content, changeContent, resetContent] = useInput();
  const [tags, changeTags, resetTags] = useInput();
  const { isLoading, error, sendRequest } = useHTTP();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    let splitTags = tags.split(",");
    splitTags = [...new Set(splitTags)];
    splitTags = splitTags.map((tag) => {
      return { tagName: tag };
    });
    let data = {
      title: title,
      content: content,
      tags: splitTags,
    };
    const config = {
      data: data,
      url: "http://localhost:9000/questions/create-question",
      method: "post",
      headers: {},
    };
    const resHandler = (res) =>
      dispatch(questionsActions.addNewQuestion(res.data.question));
    await sendRequest(config, resHandler, true);
    resetTitle();
    resetContent();
    resetTags();
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
        <h1>Ask a Question</h1>
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
        <label htmlFor="tags">Tags separated by ,</label>
        <input type="text" id="tags" onChange={changeTags} value={tags} />
      </div>
      <div>
        <Button config={{ name: "Post Question", type: "submit" }} />
      </div>
      <h3>{extraMessage}</h3>
    </form>
  );
};

export default QuestionForm;

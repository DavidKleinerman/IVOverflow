import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import useHTTP from "../../hooks/useHTTP";
import TagsList from "../Tags/TagsList";

const FullQuestion = () => {
  const [question, setQuestion] = useState({});
  const { questionId } = useParams();
  const { isLoading, error, sendRequest } = useHTTP();

  useEffect(() => {
    const fetchQuestion = async () => {
      console.log(questionId);
      const config = {
        url: "http://localhost:9000/questions/get-question/" + questionId,
        method: "get",
        headers: {},
      };
      await sendRequest(
        config,
        (res) => {
          setQuestion(res.data.question);
        },
        true
      );
    };
    fetchQuestion();
  }, [sendRequest, questionId]);

  let extraMessage = "";
  let gotItems = true;

  if (error) {
    extraMessage = error.message;
    gotItems = false;
  } else if (isLoading) {
    extraMessage = "Loading...";
    gotItems = false;
  }

  return (
    <Fragment>
      {gotItems ? (
        <section>
          <div>
            <h2>{question.title}</h2>
          </div>
          <div>
            <p>{question.content}</p>
          </div>
          <div>
            <TagsList tags={question.tags} />
          </div>
          <div>
            <h4>
              created: {question.createdAt} by: {question.author}
            </h4>
          </div>
        </section>
      ) : (
        <h3>{extraMessage}</h3>
      )}
    </Fragment>
  );
};

export default FullQuestion;

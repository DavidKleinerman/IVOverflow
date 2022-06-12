import AnswerForm from "./AnswerForm";
import AnswersList from "./AnswersList";

const AnswersHolder = () => {
  return (
    <section>
      <AnswerForm />
      <h2>Answers</h2>
      <AnswersList />
    </section>
  );
};

export default AnswersHolder;

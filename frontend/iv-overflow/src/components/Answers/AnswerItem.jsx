const AnswerItem = (props) => {
  return (
    <li>
      <div>
        <h2>{props.title}</h2>
      </div>
      <div>
        <p>{props.content}</p>
      </div>
      <div>
        <h4>
          created: {props.createdAt} by: {props.author}
        </h4>
      </div>
    </li>
  );
};

export default AnswerItem;

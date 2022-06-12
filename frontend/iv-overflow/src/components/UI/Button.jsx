const Button = (props) => {
  return (
    <button
      type={props.config.type ? props.config.type : "button"}
      onClick={props.config.click}
    >
      {props.config.name}
    </button>
  );
};

export default Button;

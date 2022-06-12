import TagItem from "./TagItem";

const TagsList = (props) => {
  return (
    <ul>
      {props.tags &&
        props.tags.map((tag) => (
          <TagItem key={tag.tagName} tagName={tag.tagName} />
        ))}
    </ul>
  );
};

export default TagsList;

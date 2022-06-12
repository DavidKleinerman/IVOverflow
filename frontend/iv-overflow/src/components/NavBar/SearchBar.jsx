import { Fragment } from "react";

const SearchBar = () => {
  return (
    <Fragment>
      <label htmlFor="search">Search</label>
      <input type="text" id="search" />
    </Fragment>
  );
};
export default SearchBar;

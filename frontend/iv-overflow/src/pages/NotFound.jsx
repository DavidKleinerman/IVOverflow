import { useEffect } from "react";

import useLogout from "../hooks/useLogout";

const NotFound = () => {
  const { checkExpiration } = useLogout();
  useEffect(() => {
    checkExpiration();
  }, [checkExpiration]);
  return <h1>404 PAGE NOT FOUND</h1>;
};

export default NotFound;

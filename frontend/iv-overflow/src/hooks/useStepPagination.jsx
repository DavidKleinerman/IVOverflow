import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHTTP from "./useHTTP";

const useStepPagination = (
  url,
  itemsName,
  itemsAdder,
  pageUpdater,
  nextPageSelector,
  resetItems
) => {
  const dispatch = useDispatch();
  const nextPage = useSelector(nextPageSelector);
  const [showMore, setShowMore] = useState(true);
  const { isLoading, error, sendRequest } = useHTTP();

  useEffect(() => {
    const getItems = async () => {
      if (nextPage === 2) {
        dispatch(resetItems());
        const config = {
          url: url + "/1",
          method: "get",
          headers: {},
        };
        await sendRequest(
          config,
          (res) => {
            dispatch(itemsAdder(res.data[itemsName]));
          },
          true
        );
      }
    };
    getItems();
  }, [sendRequest, url, itemsName, dispatch, itemsAdder, nextPage, resetItems]);

  const moreItemsHandler = async () => {
    const config = {
      url: url + "/" + nextPage,
      method: "get",
      headers: {},
    };
    const makeNewItemsPage = (res) => {
      dispatch(pageUpdater(nextPage + 1));
      dispatch(itemsAdder(res.data[itemsName]));
      if (res.data[itemsName].length === 0) {
        setShowMore(false);
      }
    };
    await sendRequest(config, makeNewItemsPage, true);
  };

  return { showMore, moreItemsHandler, isLoading, error };
};

export default useStepPagination;

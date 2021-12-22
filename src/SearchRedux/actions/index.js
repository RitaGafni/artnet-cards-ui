export const changeSearchType = () => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_SEARCH_TYPE',
    });
  };
};

export const updateBasicSearchQ = (basicQ) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_BASIC_SEARCH',
      basicSearchQ: basicQ,
    });
  };
};

export const updateAdvSearchCat = (num, advCat) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_CAT',
      num,
      advCat: advCat,
    });
  };
};

export const updateAdvSearchQ = (num, advQ) => {
  return (dispatch) => {
    dispatch({
      type: 'UPDATE_Q',
      num,
      advQ: advQ,
    });
  };
};

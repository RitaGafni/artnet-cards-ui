const basicSearchReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_BASIC_SEARCH':
      return action.basicSearchQ;
    default:
      return state;
  }
};

export default basicSearchReducer;

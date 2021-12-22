const advSearchQReducer = (state = ['', ''], action) => {
  switch (action.type) {
    case 'UPDATE_Q':
      const newArray = [...state];
      newArray[action.num] = action.advQ;
      return newArray;
    default:
      return state;
  }
};

export default advSearchQReducer;

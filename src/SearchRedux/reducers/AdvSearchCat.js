const advSearchCatReducer = (state = ['employeeName', 'company'], action) => {
  switch (action.type) {
    case 'UPDATE_CAT':
      const newArray = [...state];
      newArray[action.num] = action.advCat;
      return newArray;
    default:
      return state;
  }
};

export default advSearchCatReducer;

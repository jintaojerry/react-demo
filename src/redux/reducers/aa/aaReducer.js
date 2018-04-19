let initialState = {
  pagination: {
    defaultCurrent: 1,
  },
  data:null
};

function aaReducer(state = initialState, action) {
  switch (action.type) {
    case "AAACTION":
      return action.payload;
    default:
      return state;
  }
}

export default aaReducer;

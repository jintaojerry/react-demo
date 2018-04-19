let initialState = {
    userName:''
}

function bbReducer (state = initialState, action) {
  
    switch (action.type) {
        case "BBACTION":
          return action.payload
        default:
          return state;
      }
}

export default bbReducer
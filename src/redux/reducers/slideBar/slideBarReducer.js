let initialCollapsed = false
function collapsed(state = initialCollapsed, action) {
  switch (action.type) {
    case "TOGGLE":
      return !state;
    default:
      return state;
  }
}

export default collapsed
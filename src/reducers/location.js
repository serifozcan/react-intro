// pure funtion
// does not have side effect
export default function locationReducer(state = "Seattle, WA", action) {
  // return Object.assign({}, state, { location: action.payload });
  // with combine reducers state is only location
  if (action.type === "SET_LOCATION") {
    return action.payload;
  } else {
    state;
  }
}

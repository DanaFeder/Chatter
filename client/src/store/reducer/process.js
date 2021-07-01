//takes the current state and the action object to return a new state
export const ProcessReducer = (state = {}, action) => {
  switch (action.type) {
    case "PROCESS":
      return { ...action.payload };

    default:
      return state;
  }
};

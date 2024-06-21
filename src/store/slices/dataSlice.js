// Example reducer update
const initialState = {
  // other initial states
  submittedRecords: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_SUBMITTED_RECORD':
      return {
        ...state,
        submittedRecords: [...state.submittedRecords, action.payload],
      };
    // handle other actions
    default:
      return state;
  }
};

export default reducer;

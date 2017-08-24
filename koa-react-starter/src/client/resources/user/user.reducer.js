const initialState = { username: '' };

export default (state = initialState, action) => {
  switch (action.type) {
    case 'fetchUser':
      return action.payload;
    case 'updateUser':
      return {
        ...state,
        username: action.username || state.username,
        info: action.info || state.info,
      };
    default:
      return state;
  }
};

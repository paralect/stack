import * as api from './user.api';


export const fetchUser = () => dispatch =>
  api.fetchUser()
    .then(payload => dispatch({ type: 'fetchUser', payload }));

export const updateUser = ({ username, info }) => dispatch =>
  api.updateUser({ username, info })
    .then(payload => dispatch({ type: 'updateUser', username, info, payload }));

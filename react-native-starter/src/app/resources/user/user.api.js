export function fetchUser() {
  return new Promise(resolve => resolve({
    id: 1,
    username: 'John Doe',
    info: 'unknown',
  }));
}

export function updateUser(id, newUsername, newInfo) { // eslint-disable-line
  return new Promise(resolve => resolve({}));
}

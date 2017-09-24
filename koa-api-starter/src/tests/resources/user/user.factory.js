const Builder = require('./staff.builder');

exports.rootUser = async () => {
  const builder = new Builder();
  const user = await builder
    .rootEmail()
    .password()
    .build();

  return user;
};

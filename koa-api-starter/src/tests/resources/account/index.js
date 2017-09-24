const db = require('db');
const constants = require('app.constants');

module.exports = (request) => {
  describe('/account', () => {
    before(async () => {
      await db.get(constants.DATABASE_DOCUMENTS.USERS).drop();
    });

    it('should successfully create new user', (done) => {
      request.post('/account/signup')
        .send({
          firstName: 'Ivan',
          lastName: 'Balalaikin',
          email: 'test@test.test',
          password: 'qwerty',
        })
        .expect(200)
        .end(done);
    });

    it('should return an error that email is already registered.', (done) => {
      request.post('/account/signup')
        .send({
          firstName: 'Petr',
          lastName: 'Ivanov',
          email: 'test@test.test',
          password: 'qwerty',
        })
        .expect(400)
        .expect((res) => {
          const errors = res.body.errors;
          errors[0].email.should.be.equal('User with this email is already registered.');
        })
        .end(done);
    });
  });
};

const chai = require('chai');
const MongoService = require('./MongoService');
const config = require('./config');

chai.should();

const db = require('./').connect(config.mongo.connection);

module.exports = () => {
  describe('MongoService', () => {
    const userService = db.createService(`users-${new Date().getTime()}`);
    const findUserService = db.createService(`users-${new Date().getTime()}`);

    after(async () => {
      await Promise.all([
        userService._collection.drop(),
        findUserService._collection.drop(),
      ]);
    });

    it('should create a document', async () => {
      const doc = await userService.create({ name: 'Bob' });
      doc.name.should.be.equal('Bob');
    });

    it('should create multiple documents', async () => {
      const docs = await userService.create([{ name: 'Bob' }, { name: 'Alice' }]);
      docs[0].name.should.be.equal('Bob');
      docs[1].name.should.be.equal('Alice');
    });

    it('should emit `created` event when document saved to the database', (done) => {
      userService.create([{ name: 'Bob' }])
        .catch((err) => {
          throw err;
        });

      userService.once('created', (evt) => {
        evt.doc.name.should.be.equal('Bob');
        done();
      });
    });

    it('should emit `removed` event when document removed from the database', (done) => {
      userService.once('removed', (evt) => {
        evt.doc.name.should.be.equal('Bob');
        done();
      });

      userService.create([{ name: 'Bob' }])
        .then((doc) => {
          return userService.remove({ _id: doc._id });
        })
        .catch((err) => {
          throw err;
        });
    });

    it('should update a document in a database', async () => {
      let doc = await userService.create([{ name: 'Bob' }]);
      doc = await userService.update({ _id: doc._id }, (u) => {
        const user = u;
        user.name = 'Alice';
      });
      doc.name.should.be.equal('Alice');
    });

    it('should emit `updated` event when document updated in the database', async () => {
      const doc = await userService.create([{ name: 'Bob' }]);
      userService.update({ _id: doc._id }, (u) => {
        const user = u;
        user.name = 'Alice';
      })
        .catch((err) => {
          throw err;
        });

      await new Promise((resolve, reject) => {
        userService.once('updated', (evt) => {
          evt.doc.name.should.be.equal('Alice');
          evt.prevDoc.name.should.be.equal('Bob');
          resolve();
        });
      });
    });

    it('it should return paged result if page > 0', async () => {
      // create separate service to stricly check count
      // and do not mix with other tests
      await findUserService.create([{ name: 'Bob' }, { name: 'Alice' }, { name: 'Nick' }]);

      const options = { page: 1, perPage: 2, sort: { name: 1 } };
      const res = await findUserService.find({}, options);
      res.results.length.should.be.equal(2);
      res.pagesCount.should.be.equal(2);
      res.count.should.be.equal(3);
    });

    it('should create a document', async () => {
      const user = { name: 'Bob' };
      const doc = await userService.createOrUpdate({ _id: '1' }, (dbUser) => {
        Object.assign(dbUser, user);
      });
      doc._id.should.be.equal('1');
      doc.name.should.be.equal('Bob');
    });

    it('should create two documents', async () => {
      const user1 = { name: 'Bob' };
      let doc = await userService.createOrUpdate({ _id: '1' }, (dbUser) => {
        Object.assign(dbUser, user1);
      });
      doc._id.should.be.equal('1');
      doc.name.should.be.equal('Bob');

      const user2 = { name: 'Alice' };
      doc = await userService.createOrUpdate({ _id: '2' }, (dbUser) => {
        Object.assign(dbUser, user2);
      });

      doc._id.should.be.equal('2');
      doc.name.should.be.equal('Alice');
    });

    it('should update document', async () => {
      const user1 = { name: 'Bob' };
      let doc = await userService.createOrUpdate({ _id: '1' }, (dbUser) => {
        Object.assign(dbUser, user1);
      });
      doc._id.should.be.equal('1');
      doc.name.should.be.equal('Bob');

      const user2 = { name: 'Alice' };
      doc = await userService.createOrUpdate({ _id: '1' }, (dbUser) => {
        Object.assign(dbUser, user2);
      });
      doc._id.should.be.equal('1');
      doc.name.should.be.equal('Alice');
    });

    it('should perform atomic document update', async () => {
      const _id = 'atomic_update';
      await userService.create({ _id, name: 'Bob' });
      await userService.atomic.update({ _id }, {
        $set: {
          name: 'Alice',
        },
      });
      const userDoc = await userService.findOne({ _id });
      userDoc.name.should.be.equal('Alice');
    });

    it('should deepCompare nested properties passed as an Array', () => {
      const data = { user: { firstName: 'Bob' } };
      const initialData = { user: { firstName: 'John' } };

      const changed = MongoService.deepCompare(data, initialData, ['user.firstName']);
      changed.should.be.equal(true);
    });

    it('should _deepCompare nested properties passed as an Object', () => {
      const data = { user: { firstName: 'Bob' } };
      const initialData = { user: { firstName: 'John' } };

      const changed = MongoService.deepCompare(data, initialData, { 'user.firstName': 'Bob' });
      changed.should.be.equal(true);
    });

    it('should update document using atomic modifiers', async () => {
      const _id = 'find_one_and_update';
      await userService.create({ _id, name: 'Bob' });
      await userService.findOneAndUpdate({ _id }, {
        $set: {
          name: 'Alice',
        },
      });
      const userDoc = await userService.findOne({ _id });
      userDoc.name.should.be.equal('Alice');
    });
  });
};

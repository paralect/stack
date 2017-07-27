class MongoServiceError extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'MongoServiceError';
    this.code = code;
  }
}

MongoServiceError.NOT_FOUND = 'NOT_FOUND';
MongoServiceError.INVALID_SCHEMA = 'INVALID_SCHEMA';
MongoServiceError.MORE_THAN_ONE = 'MORE_THAN_ONE';

module.exports = MongoServiceError;

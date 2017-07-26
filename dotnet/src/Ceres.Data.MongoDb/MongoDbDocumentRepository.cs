using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ceres.Data.Entities;
using MongoDB.Driver;

namespace Ceres.Data.MongoDb
{
    public class MongoDbDocumentRepository<T> : IDocumentRepository<T> where T: IEntity, new()
    {
        private readonly IMongoCollection<T> _collection;

        public MongoDbDocumentRepository(IMongoDatabase database, string collectionName = null)
        {
            _collection = database.GetCollection<T>(collectionName ?? typeof(T).Name);
        }
        
        public async Task<T> GetByIdAsync(Guid id)
        {
            var cursor = await _collection.FindAsync(x => x.Id == id);
            return await cursor.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> criteria)
        {
            var cursor = await _collection.FindAsync(criteria);
            return await cursor.ToListAsync();
        }

        public async Task<T> FindOneAsync(Expression<Func<T, bool>> criteria)
        {
            var cursor = await _collection.FindAsync(criteria);
            return await cursor.FirstOrDefaultAsync();
        }

        public async Task InsertAsync(T document)
        {
            await  _collection.InsertOneAsync(document);
        }

        public async Task UpdateAsync(T document)
        {
            await _collection.ReplaceOneAsync(Builders<T>.Filter.Eq(x => x.Id, document.Id), document);
        }

        public async Task DeleteAsync(T document)
        {
            await _collection.DeleteOneAsync(Builders<T>.Filter.Eq(x => x.Id, document.Id));
        }
    }
}

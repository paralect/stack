using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Ceres.Data.MongoDb
{
    public abstract class MongoDbDocumentService<T> : IDocumentService<T> where T: IEntity, new()
    {
        protected abstract string CollectionName { get; }
        protected IMongoCollection<T> Collection { get; private set; }

        protected MongoDbDocumentService(IMongoDatabase database)
        {
            Collection = database.GetCollection<T>(CollectionName);
        }
        
        public async Task<T> GetByIdAsync(Guid id)
        {
            var cursor = await Collection.FindAsync(x => x.Id == id);
            return await cursor.FirstOrDefaultAsync();
        }

        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> criteria)
        {
            var cursor = await Collection.FindAsync(criteria);
            return await cursor.ToListAsync();
        }

        public async Task InsertAsync(T document)
        {
            await  Collection.InsertOneAsync(document);
        }

        public async Task UpdateAsync(T document)
        {
            await Collection.ReplaceOneAsync(Builders<T>.Filter.Eq(x => x.Id, document.Id), document);
        }

        public async Task DeleteAsync(T document)
        {
            await Collection.DeleteOneAsync(Builders<T>.Filter.Eq(x => x.Id, document.Id));
        }
    }
}

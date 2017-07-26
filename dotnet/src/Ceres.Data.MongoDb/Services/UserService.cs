using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Ceres.Data.Entities;
using MongoDB.Driver;

namespace Ceres.Data.MongoDb.Services
{
    public class UserService : MongoDbDocumentService<User>
    {
        protected override string CollectionName => "Users";

        public UserService(IMongoDatabase database) : base(database)
        {
        }

        public async Task<User> FindByUsername(string username)
        {
            return (await FindAsync(x => x.Username == username)).FirstOrDefault();
        }
    }
}

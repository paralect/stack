using System;
using System.Threading.Tasks;
using Ceres.Data;
using Ceres.Data.Entities.Auth;

namespace Ceres.Services
{
    public class UserService : IUserService
    {
        private readonly IDocumentRepository<User> _users;

        public UserService(IDocumentRepository<User> users)
        {
            _users = users;
        }

        public Task AddUser(User user)
        {
            return _users.InsertAsync(user);
        }

        public Task UpdateUser(User user)
        {
            return _users.UpdateAsync(user);
        }

        public Task<User> FindByEmail(string email)
        {
            return _users.FindOneAsync(x => x.Email == email);
        }

        public Task<User> FindByUsername(string username)
        {
            return _users.FindOneAsync(x => x.UserName == username);
        }
    }
}

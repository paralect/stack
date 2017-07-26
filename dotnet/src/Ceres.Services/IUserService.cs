using System.Threading.Tasks;
using Ceres.Data.Entities.Auth;

namespace Ceres.Services
{
    public interface IUserService
    {
        Task AddUser(User user);
        Task UpdateUser(User user);
        Task<User> FindByEmail(string email);
        Task<User> FindByUsername(string username);
    }
}
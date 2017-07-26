using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Ceres.Data.Entities;

namespace Ceres.Data
{
    public interface IDocumentRepository<T> where T: IEntity
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> criteria);
        Task<T> FindOneAsync(Expression<Func<T, bool>> criteria);
        Task InsertAsync(T document);
        Task UpdateAsync(T document);
        Task DeleteAsync(T document);
    }
}

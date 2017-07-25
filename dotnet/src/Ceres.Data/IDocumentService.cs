using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Ceres.Data
{
    public interface IDocumentService<T> where T: IEntity
    {
        Task<T> GetByIdAsync(Guid id);
        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> criteria);
        Task InsertAsync(T document);
        Task UpdateAsync(T document);
        Task DeleteAsync(T document);
    }
}

using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Ceres.Data.Entities
{
    public interface IEntity
    {
        [BsonId]
        Guid Id { get; set; }
    }
}

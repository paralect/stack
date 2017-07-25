using System;
using MongoDB.Bson.Serialization.Attributes;

namespace Ceres.Data
{
    public interface IEntity
    {
        [BsonId]
        Guid Id { get; set; }
    }
}

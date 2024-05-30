using System.Text.Json.Serialization;

namespace OMS.Domain.Entities.Entity
{
    public interface IBaseUpdateEntity
    {
        [JsonIgnore]
        public DateTime? UpdatedAt { get; set; }
        [JsonIgnore]
        public short? UpdatedBy { get; set; }
    }
}

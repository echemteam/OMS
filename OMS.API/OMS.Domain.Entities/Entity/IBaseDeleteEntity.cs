using System.Text.Json.Serialization;

namespace OMS.Domain.Entities.Entity
{
    public interface IBaseDeleteEntity
    {
        [JsonIgnore]
        public DateTime? DeletedAt { get; set; }
        [JsonIgnore]
        public short? DeletedBy { get; set; }
    }
}

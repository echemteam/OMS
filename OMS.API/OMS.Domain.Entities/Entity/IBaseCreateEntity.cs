using System.Text.Json.Serialization;

namespace OMS.Domain.Entities.Entity
{
    public interface IBaseCreateEntity
    {
        [JsonIgnore]
        public DateTime? CreatedAt { get; set; }
        [JsonIgnore]
        public short? CreatedBy { get; set; }
    }
}

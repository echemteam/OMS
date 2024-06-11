using System.Text.Json.Serialization;

namespace OMS.Domain.Entities.Entity.Contact
{
    public class PhoneDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? PhoneId { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PhoneCode { get; set; }
        public long? ContactId { get; set; }
        public byte? OwnerTypeId { get; set; }
        public short? PhoneTypeId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}

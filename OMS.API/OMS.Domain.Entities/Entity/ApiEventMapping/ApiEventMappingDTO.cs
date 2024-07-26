namespace OMS.Domain.Entities.Entity.ApiEventMapping
{
    public class ApiEventMappingDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? ApiEventMappingId { get; set; }
        public int? ApiEventId { get; set; }
        public int? ProviderId { get; set; }
        public int? EndpointId { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}

namespace OMS.Domain.Entities.Entity.ApiEvent
{
    public class ApiEventDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? ApiEventId { get; set; }
        public string? EventName { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}

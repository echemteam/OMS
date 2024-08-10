namespace OMS.Domain.Entities.Entity.ApiEventRequiredField
{
    public class ApiEventRequiredFieldDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? ApiEventRequiredFieldId { get; set; }
        public string? FieldName { get; set; }
        public string? FieldType { get; set; }
        public string? FieldDescription { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
        public int? ApiEventId { get; set; }
    }
}

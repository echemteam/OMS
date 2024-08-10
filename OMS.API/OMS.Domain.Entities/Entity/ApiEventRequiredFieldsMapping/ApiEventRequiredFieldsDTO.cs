namespace OMS.Domain.Entities.Entity.ApiEventRequiredFieldsMapping
{
    public class ApiEventRequiredFieldsDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? ApiEventRequiredFieldsMappingId { get; set; }
        public int? ApiEventRequiredFieldId { get; set; }
        public string? RequiredField { get; set; }
        public int? ApiEventId { get; set; }
        public int? EndpointId { get; set; }
        public string? APIResponseFieldName { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}

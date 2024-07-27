namespace OMS.Domain.Entities.Entity.ApiParameterMapping
{
    public class ApiParameterMappingDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? ApiParameterMappingId { get; set; }
        public int? ApiEventParameterId { get; set; }
        public int? ParameterId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}

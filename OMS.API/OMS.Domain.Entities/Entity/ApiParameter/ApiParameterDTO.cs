namespace OMS.Domain.Entities.Entity.ApiParameter
{
    public class ApiParameterDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? ParameterId { get; set; }
        public int? EndpointId { get; set; }
        public string? Name { get; set; }
        public string? DataType { get; set; }
        public string? DefaultValue { get; set; }
        public bool? IsRequired { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}

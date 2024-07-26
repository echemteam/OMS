namespace OMS.Domain.Entities.Entity.ApiEventParameter
{
    public class ApiEventParameterDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? ApiEventParametersId { get; set; }
        public int? ApiEventId { get; set; }
        public string? ParameterName { get; set; }
        public string? ParameterType { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}

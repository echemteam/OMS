namespace OMS.Domain.Entities.Entity.ApiProvider
{
    public class ApiProviderDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? ProviderId { get; set; }
        public string? Name { get; set; }
        public string? BaseURL { get; set; }
        public string? AuthenticationType { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}

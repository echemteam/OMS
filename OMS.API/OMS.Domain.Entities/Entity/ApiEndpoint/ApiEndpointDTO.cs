namespace OMS.Domain.Entities.Entity.ApiEndpoint
{
    public class ApiEndpointDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? EndpointId { get; set; }
        public int? ProviderId { get; set; }
        public string? Name { get; set; }
        public string? Path { get; set; }
        public string? Method { get; set; }
        public string? Description { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}

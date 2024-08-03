namespace OMS.Domain.Entities.API.Response.ApiParameterMapping
{
    public class GetApiParameterMappingsResponse
    {
        public int? ApiParameterMappingId { get; set; }
        public int? ApiEventId { get; set; }
        public int? ProviderParameterId { get; set; }
        public string? ProviderParameterName { get; set; }
        public int? EventParameterId { get; set; }
        public string? EventParameterName { get; set; }
    }
}

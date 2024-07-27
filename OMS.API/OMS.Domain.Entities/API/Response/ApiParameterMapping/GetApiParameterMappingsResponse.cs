namespace OMS.Domain.Entities.API.Response.ApiParameterMapping
{
    public class GetApiParameterMappingsResponse
    {
        public int? ApiParameterMappingId { get; set; }
        public int? ApiEventParameterId { get; set; }
        public string? EventParameterName { get; set; }
        public int? ParameterId { get; set; }
        public string? ParameterName { get; set; }
    }
}

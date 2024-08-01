namespace OMS.Domain.Entities.API.Response.ApiParameterMapping
{
    public class GetApiParameterMappingsResponse
    {
        public int? ApiParameterMappingId { get; set; }
        public int? ApiEventId { get; set; }
        public int? ParameterId { get; set; }
        public string? ParameterName { get; set; }
        public string? DataType { get; set; }
    }
}

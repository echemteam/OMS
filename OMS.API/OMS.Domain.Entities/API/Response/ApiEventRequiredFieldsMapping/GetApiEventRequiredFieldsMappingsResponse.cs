namespace OMS.Domain.Entities.API.Response.ApiEventRequiredFieldsMapping
{
    public class GetApiEventRequiredFieldsMappingsResponse
    {
        public int? ApiEventRequiredFieldsMappingId { get; set; }
        public int? ApiEventRequiredFieldId { get; set; }
        public string? RequiredField { get; set; }
        public int? ApiEventId { get; set; }
        public int? EndpointId { get; set; }
        public string? APIResponseFieldName { get; set; }
        public string? FieldName { get; set; }
    }
}

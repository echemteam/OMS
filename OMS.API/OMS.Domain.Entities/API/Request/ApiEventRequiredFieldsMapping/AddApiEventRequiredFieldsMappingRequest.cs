namespace OMS.Domain.Entities.API.Request.ApiEventRequiredFieldsMapping
{
    public class AddApiEventRequiredFieldsMappingRequest
    {
        public int? ApiEventRequiredFieldId { get; set; }
        public string? RequiredField { get; set; }
        public int? ApiEventId { get; set; }
        public int? EndpointId { get; set; }
        public string? APIResponseFieldName { get; set; }
    }
}

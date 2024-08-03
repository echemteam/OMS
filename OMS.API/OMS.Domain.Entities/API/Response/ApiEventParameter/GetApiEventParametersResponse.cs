namespace OMS.Domain.Entities.API.Response.ApiEventParameter
{
    public class GetApiEventParametersResponse
    {
        public int? ApiEventParametersId { get; set; }
        public int? ApiEventId { get; set; }
        public string? ParameterName { get; set; }
        public string? ParameterType { get; set; }
        public string? DefaultValue { get; set; }
        public string? DataType { get; set; }
        public bool? IsRequired { get; set; }
        public int? ParameterId { get; set; }
    }
}

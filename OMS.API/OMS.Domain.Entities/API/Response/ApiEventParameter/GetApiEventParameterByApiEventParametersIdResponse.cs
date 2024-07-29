namespace OMS.Domain.Entities.API.Response.ApiEventParameter
{
    public class GetApiEventParameterByApiEventParametersIdResponse
    {
        public int? ApiEventParametersId { get; set; }
        public int? ApiEventId { get; set; }
        public string? EventName { get; set; }
        public string? ParameterName { get; set; }
        public string? ParameterType { get; set; }
    }
}

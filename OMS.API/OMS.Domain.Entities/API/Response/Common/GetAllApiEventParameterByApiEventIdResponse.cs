namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllApiEventParameterByApiEventIdResponse
    {
        public int? ApiEventParametersId { get; set; }
        public string? ParameterName { get; set; }
        public string? ParameterType { get; set; }
    }
}

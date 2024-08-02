namespace OMS.Domain.Entities.API.Request.ApiEventParameter
{
    public class AddEditApiEventParameterRequest
    {
        public int? ApiEventParametersId { get; set; }
        public int? ApiEventId { get; set; }
        public string? ParameterName { get; set; }
        public string? ParameterType { get; set; }
        public string? DefaultValue { get; set; }
    }
}

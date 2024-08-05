namespace OMS.Domain.Entities.API.Request.ApiEventParameter
{
    public class AddEditApiEventParameterRequest
    {
        public int? ParameterId { get; set; }
        public int? ApiEventId { get; set; }
        public string? ParameterName { get; set; }
        public string? DataType { get; set; }
        public string? DefaultValue { get; set; }
        public bool? IsRequired { get; set; }
        public string? ParameterType { get; set; }
    }
}

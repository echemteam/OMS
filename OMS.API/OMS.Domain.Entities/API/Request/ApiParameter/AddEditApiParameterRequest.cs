namespace OMS.Domain.Entities.API.Request.ApiParameter
{
    public class AddEditApiParameterRequest
    {
        public int? ParameterId { get; set; }
        public int? EndpointId { get; set; }
        public string? Name { get; set; }
        public string? DataType { get; set; }
        public string? DefaultValue { get; set; }
        public bool? IsRequired { get; set; }
        public string? ParameterType { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Request.ApiParameterMapping
{
    public class AddApiParameterMappingRequest
    {
        public int? ApiEventId { get; set; }
        public int? EventParameterId { get; set; }
        public int? ProviderParameterId { get; set; }
    }
}

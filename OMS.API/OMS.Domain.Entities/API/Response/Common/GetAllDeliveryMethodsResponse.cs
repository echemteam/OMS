namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllDeliveryMethodsResponse
    {
        public byte? DeliveryMethodId { get; set; }
        public string? Name { get; set; }
        public bool? IsForInternational { get; set; }
    }
}

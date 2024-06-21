namespace OMS.Domain.Entities.API.Response.CustomerAccountingSettings
{
    public class GetShppingDeliveryCarrierAndDeliveryMethodsByIdResponse
    {
        public int? DeliveryAccountId { get; set; }
        public string? Name { get; set; }
        public List<GetShppingDeliveryCarriersByCustomerIdResponse>? ShppingDeliveryCarriersList {  get; set; }
        public List<GetDeliveryMethodsCustomerIdResponse>? DeliveryMethodsList { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Response.CustomerAccountingSettings
{
    public class GetCustomerDeliveryMethodByCustomerDeliveryMethodIdResponse
    {
        public int? CustomerDeliveryMethodId { get; set; }
        public int? CustomerId { get; set; }
        public byte? DeliveryMethodId { get; set; }
        public bool? IsForInternational { get; set; }
        public string? Name { get; set; }
        public decimal? Charge { get; set; }
        public bool? IsPrimary { get; set; }
    }
}

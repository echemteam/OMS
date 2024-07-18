namespace OMS.Domain.Entities.API.Response.CustomerAccountingSettings
{
    public class GetShppingDeliveryCarriersByCustomerIdResponse
    {
        public long? CustomerDeliveryCarrierId { get; set; }
        public short? CarrierId { get; set; }
        public string? Carrier { get; set; }
        public string? AccountNumber { get; set; }
        public int? CustomerId { get; set; }
        public bool? IsPrimary { get; set; }
        public decimal? HandlingFee { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Request.CustomerAccountingNotes
{
    public class AddShppingDeliveryCarriersRequest
    {
        public short? CarrierId { get; set; }
        public string? AccountNumber { get; set; }
        public int? CustomerId { get; set; }
        public bool? IsPrimary { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Request.CustomerAccountingNotes
{
    public class UpdateShppingDeliveryCarriersRequest
    {
        public long? CustomerDeliveryCarrierId { get; set; }
        public string? AccountNumber { get; set; }
        public int? CustomerId { get; set; }
        public bool? IsPrimary { get; set; }

    }
}

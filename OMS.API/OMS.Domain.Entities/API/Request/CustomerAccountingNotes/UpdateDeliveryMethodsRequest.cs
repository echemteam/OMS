namespace OMS.Domain.Entities.API.Request.CustomerAccountingNotes
{
    public class UpdateDeliveryMethodsRequest
    {
        public int? CustomerDeliveryMethodId { get; set; }
        public int? CustomerId { get; set; }
        public byte? DeliveryMethodId { get; set; }
        public decimal? Charge { get; set; }
        public bool? IsPrimary { get; set; }
    }
}

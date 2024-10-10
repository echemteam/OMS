namespace OMS.Domain.Entities.API.Request.OrderItem
{
    public class UpdateOrderDetailRequest
    {

        public int? OrderId { get; set; }
        public byte? OrderMethodId { get; set; }
        public DateTime? OrderReceivedDate { get; set; }
        public string? ReferenceNumber { get; set; }
        public int? CustomerId { get; set; }
        public string? PoNumber { get; set; }

    }
}

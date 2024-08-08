namespace OMS.Domain.Entities.API.Response.Orders
{
    public class GetPoNumberDetailsByPoNumberResponse
    {
        public int? OrderId { get; set; }
        public int? CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? PoNumber { get; set; }
        public DateTime? OrderReceivedDate { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Request.Orders
{
    public class CheckPoNumberExistOrNotRequest
    {
        public int? CustomerId { get; set; }
        public string? PoNumber { get; set; }

    }
}

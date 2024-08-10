namespace OMS.Domain.Entities.API.Request.CustomerNotes
{
    public class AddCustomerNotesRequest
    {
        public int? CustomerId { get; set; }
        public string? Note { get; set; }
    }
}

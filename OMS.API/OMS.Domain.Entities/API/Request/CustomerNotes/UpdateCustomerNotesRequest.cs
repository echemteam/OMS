namespace OMS.Domain.Entities.API.Request.CustomerNotes
{
    public class UpdateCustomerNotesRequest
    {
        public long? CustomerNoteId { get; set; }
        public string? Note { get; set; }
        public int? CustomerId { get; set; }
    }
}


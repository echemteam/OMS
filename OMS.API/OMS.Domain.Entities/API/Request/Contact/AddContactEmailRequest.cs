namespace OMS.Domain.Entities.API.Request.Contact
{
    public class AddContactEmailRequest
    {
        public string? EmailAddress { get; set; }
        public int? ContactId { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Request.Contact
{
    public class UpdateContactEmailRequest
    {
        public int? EmailId { get; set; }
        public string? EmailAddress { get; set; }
    }
}

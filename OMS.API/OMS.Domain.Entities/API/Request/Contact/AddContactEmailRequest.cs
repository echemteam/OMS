namespace OMS.Domain.Entities.API.Request.Contact
{
    public class AddContactEmailRequest
    {
        public int? EmailId { get; set; }
        public string? EmailAddress { get; set; }
        public bool? IsPrimary { get; set; }
    }
}

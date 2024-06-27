namespace OMS.Domain.Entities.API.Response.Contact
{
    public class GetEmailByContactIdResponse
    {
        public int? EmailId { get; set; }
        public string? EmailAddress { get; set; }
        public bool? IsPrimary { get; set; }
    }
}

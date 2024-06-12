namespace OMS.Domain.Entities.API.Request.Contact
{
    public class UpdateContactPhoneRequest
    {
        public int? PhoneId { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PhoneCode { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Request.Contact
{
    public class AddContactPhoneRequest
    {
        public string? PhoneNumber { get; set; }
        public string? PhoneCode { get; set; }
        public int? ContactId { get; set; }
        public short? PhoneTypeId { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Response.Contact
{
    public class GetPhoneByContactIdResponse
    {
        public int? PhoneId { get; set; }
        public string? PhoneNumber { get; set; }
        public string? PhoneCode { get; set; }
        public short? PhoneTypeId { get; set; }
        public int? Extension { get; set; }
        public string? PhoneType { get; set; }
    }
}

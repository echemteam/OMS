using OMS.Domain.Entities.API.Response.Contact;

namespace OMS.Domain.Entities.API.Response.Orders
{
    public class GetOrderContactByOrderIdResponse
    {
        public int OrderContactId { get; set; }
        public int ContactId { get; set; }
        public short? ContactTypeId { get; set; }
        public string? Type { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool? IsPrimary { get; set; }
        public List<GetEmailByContactIdResponse>? EmailAddressList { get; set; }
        public List<GetPhoneByContactIdResponse>? PhoneNumberList { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Response.Contact
{
    public class GetContactBySupplierIdResponse
    {
        public int? SupplierId { get; set; }
        public int? SupplierContactId { get; set; }
        public int ContactId { get; set; }
        public short? ContactTypeId { get; set; }
        public string? Type { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool? IsPrimary { get; set; }
        public List<GetEmailByContactIdResponse>? EmailAddressLst { get; set; }
        public List<GetPhoneByContactIdResponse>? PhoneNumberLsit { get; set; }
    }
}

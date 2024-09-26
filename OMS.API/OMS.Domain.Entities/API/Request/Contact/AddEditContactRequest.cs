namespace OMS.Domain.Entities.API.Request.Contact
{
    public class AddEditContactRequest
    {
        public int? CustomerContactId { get; set; }
        public int? ContactId { get; set; }
        public int? CustomerId { get; set; }
        public string? ContactTypeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public bool? IsPrimary { get; set; }
        public int? SupplierId { get; set; }
        public int? SupplierContactId { get; set; }
        public List<AddContactEmailRequest>? EmailAddressList { get; set; }
        public List<AddContactPhoneRequest>? PhoneNumberList { get; set; }

    }
}

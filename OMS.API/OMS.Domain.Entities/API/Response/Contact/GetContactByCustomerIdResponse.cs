namespace OMS.Domain.Entities.API.Response.Contact
{
    public class GetContactByCustomerIdResponse
    {
        public int? CustomerId { get; set; }
        public int? ContactId { get; set; }
        public short? ContactTypeId { get; set; }
        public string? Type { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? EmailAddress { get; set; }
    }
}

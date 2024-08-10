namespace OMS.Domain.Entities.Entity.Contact
{
    public class BaseContactDto
    {
        public int? ContactId { get; set; }
        public int? CustomerId { get; set; }
        public short? ContactTypeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}

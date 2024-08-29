namespace OMS.Domain.Entities.Entity.OrderContacts
{
    public class OrderContactsDto
    {
        public int? OrderContactId { get; set; }
        public int? OrderId { get; set; }
        public int? ContactId { get; set; }
        public short? ContactTypeId { get; set; }
    }
}

namespace OMS.Domain.Entities.Entity.OrderContacts
{
    public class OrderContactsDto
    {
        public int? OrderContactId { get; set; }
        public int? OrderId { get; set; }
        public int? ContactId { get; set; }
        public short? ContactTypeId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? UpdatedBy { get; set; }
        public short? DeletedBy { get; set; }
    }
}

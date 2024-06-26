namespace OMS.Domain.Entities.API.Request.Customers
{
    public class AddEditContactForSupplierRequest
    {
        public int? SupplierContactId { get; set; }
        public int? SupplierId { get; set; }
        public int? ContactId { get; set; }
        public short? ContactTypeId { get; set; }
        public bool? IsPrimary { get; set; }
    }
}

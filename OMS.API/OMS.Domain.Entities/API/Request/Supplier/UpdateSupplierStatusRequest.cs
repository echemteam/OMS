namespace OMS.Domain.Entities.API.Request.Supplier
{
    public class UpdateSupplierStatusRequest
    {
        public int? SupplierId { get; set; }
        public short? StatusId { get; set; }
    }
}

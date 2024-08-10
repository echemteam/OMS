namespace OMS.Domain.Entities.API.Request.SupplierNotes
{
    public class AddSupplierNotesRequest
    {
        public int? SupplierId { get; set; }

        public string? Note { get; set; }
    }
}

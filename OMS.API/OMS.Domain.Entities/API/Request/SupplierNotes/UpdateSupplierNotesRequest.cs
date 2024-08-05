namespace OMS.Domain.Entities.API.Request.SupplierNotes
{
    public class UpdateSupplierNotesRequest
    {
        public long? SupplierNoteId { get; set; }
        public string? Note { get; set; }
        public int? SupplierId { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Response.Orders
{
    public class OrderNotesResponse
    {
        public int? OrderNoteId { get; set; }
        public string? EntityType { get; set; }
        public string? Note { get; set; }
        public int? EntityId { get; set; }
    }
}

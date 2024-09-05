namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetNotesHistoryResponse
    {
        public int? NotesHistoryId { get; set; }
        public string? NewNote { get; set; }
        public string? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
    }
}

namespace OMS.Domain.Entities.Entity.Snippet
{
    public class SnippetDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public byte? SnippetId { get; set; }
        public string? Name { get; set; }
        public string? Hashtag { get; set; }
        public string? Body { get; set; }
        public bool? IsActive { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? DeletedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}

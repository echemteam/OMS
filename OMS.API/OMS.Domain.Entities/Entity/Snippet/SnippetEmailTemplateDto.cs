namespace OMS.Domain.Entities.Entity.Snippet
{
    public class SnippetEmailTemplateDto : IBaseCreateEntity, IBaseDeleteEntity
    {
        public int? SnippetEmailTemplateId { get; set; }
        public int? EmailTemplateId { get; set; }
        public byte? SnippetId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public short? DeletedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
    }
}

namespace OMS.Domain.Entities.API.Response.Snippet
{
    public class GetSnippetEmailSnippetByEmailTemplateIdResponse
    {
        public int? SnippetEmailTemplateId { get; set; }
        public int? EmailTemplateId { get; set; }
        public string? EmailTemplateName { get; set; }
        public byte? SnippetId { get; set; }
        public string? Name { get; set; }
        public string? Hashtag { get; set; }
        public string? Body { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}

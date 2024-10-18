namespace OMS.Domain.Entities.API.Response.Snippet
{
    public class GetSnippetsBySnippetIdResponse
    {
        public byte? SnippetId { get; set; }
        public string? Name { get; set; }
        public string? Hashtag { get; set; }
        public string? Body { get; set; }
        public bool? IsActive { get; set; }
    }
}

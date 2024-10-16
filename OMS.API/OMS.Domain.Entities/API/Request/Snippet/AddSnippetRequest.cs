namespace OMS.Domain.Entities.API.Request.Snippet
{
    public class AddSnippetRequest
    {
        public string? Name { get; set; }
        public string? Hashtag { get; set; }
        public string? Body { get; set; }
        public bool? IsActive { get; set; }
    }
}

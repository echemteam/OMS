using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Snippet
{
    public class GetSnippetsResponse
    {
        public byte? SnippetId { get; set; }
        public string? Name { get; set; }
        public string? Hashtag { get; set; }
        public string? Body { get; set; }
        public bool? IsActive { get; set; }
    }
}

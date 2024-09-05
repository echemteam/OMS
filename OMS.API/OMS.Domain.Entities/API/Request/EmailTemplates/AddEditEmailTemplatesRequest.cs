using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.EmailTemplates
{
    public class AddEditEmailTemplatesRequest
    {
        public int? EmailTemplateId { get; set; }
        public string? EmailTemplateName { get; set; }
        public string? Subject { get; set; }
        public string? EmailBody { get; set; }
        public bool? IsActive { get; set; }
    }
}

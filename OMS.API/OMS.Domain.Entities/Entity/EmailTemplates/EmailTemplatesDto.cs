using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.EmailTemplates
{
    public class EmailTemplatesDto:IBaseCreateEntity,IBaseUpdateEntity
    {
        public int? EmailTemplateId { get; set; }
        public string? EmailTemplateName { get; set; }
        public string? Subject { get; set; }
        public string? EmailBody { get; set; }
        public bool? IsActive { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
    }
}

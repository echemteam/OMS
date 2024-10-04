using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Common
{
    public class OrderDocumentList
    {
        public string? DocumentName { get; set; }
        public byte? DocumentType { get; set; }
        public string? Base64File { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Dictionary
{
    public class AddEditDictonaryRequest
    {
        public int? DictionaryId { get; set; }
        public string? Key { get; set; }
        public string? Value { get; set; }
    }
}

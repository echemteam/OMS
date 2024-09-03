using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Dictionary
{
    public class DictionaryDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        [Key]
        public int? DictionaryId { get; set; }
        public string? Key { get; set; }
        public string? Value { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }

    }
}

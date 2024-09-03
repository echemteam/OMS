using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("Dictionary")]
    public class Dictionary
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? DictionaryId { get; set; }
        [Column("Key")]
        public string? Key { get; set; }
        [Column("Value")]
        public string? Value { get; set; }
    }
}

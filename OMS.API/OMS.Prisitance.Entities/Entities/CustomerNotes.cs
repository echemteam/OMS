using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("CustomerNotes")]
    public  class CustomerNotes
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long? CustomerNoteId {  get; set; }
        public string? Note { get; set; }
        public int? CustomerId {  get; set; }
        public DateTime? CreatedAt {  get; set; }
        public short? CreatedBy {  get; set; }
        public DateTime? UpdatedAt { get;set; }
        public short? UpdatedBy { get;set; }
    }
}

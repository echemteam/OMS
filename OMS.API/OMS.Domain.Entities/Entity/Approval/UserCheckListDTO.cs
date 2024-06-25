using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Approval
{
    public class UserCheckListDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? ResponseId { get; set; }
        public int? UserId { get; set;}
        public bool? IsApproved {  get; set; }
        public int? ChecklistItemId {  get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}

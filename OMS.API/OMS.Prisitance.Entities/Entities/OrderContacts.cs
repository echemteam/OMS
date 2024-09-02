using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("L_OrderContacts")]
    public class OrderContacts
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? OrderContactId { get; set; }
        public int? OrderId { get; set; }
        public int? ContactId { get; set; }
        public short? ContactTypeId { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.Supplier
{
    public class BaseSuppliersDTO
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? SupplierId { get; set; }
    }
}

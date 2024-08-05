using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.SupplierDocuements
{
    public interface ISupplierDocuments
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? SupplierDocumentId { get; set; }
    }
}

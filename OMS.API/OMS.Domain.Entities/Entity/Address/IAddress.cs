using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace OMS.Domain.Entities.Entity.Address
{
    public interface IAddress
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? AddressId { get; set; }

        public int? CustomerId { get; set; }
    }
}

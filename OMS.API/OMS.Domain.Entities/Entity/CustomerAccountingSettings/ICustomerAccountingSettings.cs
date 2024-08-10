using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.Entity.CustomerAccountingSettings
{
    internal interface ICustomerAccountingSettings
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? CustomerAccountingSettingId { get; set; }
    }
}

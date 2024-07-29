using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Prisitance.Entities.Entities
{
    [Table("ApiEventParameter")]
    public class ApiEventParameter
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int? ApiEventParametersId { get; set; }
        public int? ApiEventId { get; set; }
        public string? ParameterName { get; set; }
        public string? ParameterType { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Organization
{
    public class OrganizationContactDetailsDto : IBaseCreateEntity, IBaseUpdateEntity , IBaseDeleteEntity
    {
        [Key ]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public short? OrganizationContactDetailId {  get; set; }
        public string? CompanyWebsite {  get; set; }
        public string? SalesEmail { get; set; }
        public string? AccountsEmail {  get; set; }
        public string? PurchaseEmail {  get; set; }
        public string? CustomerServiceEmail { get; set; }
        public string? SalesPhone { get; set; } 
        public string? AccountsPhone { get;set; }   
        public string? TollFreePhone {  get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}

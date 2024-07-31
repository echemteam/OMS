using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.Organization
{
    public  class OrganizationOtherChargesDto
    {
        public byte? OrganizationOtherChargeId { get; set; }
        public decimal? HandlingFees { get; set; }
        public decimal? BankWireFees { get; set; }
        public decimal? CreditCardServiceFees { get; set; }
        public decimal? ColdBoxFees { get; set; }
        public decimal? ITNFees { get; set; }
        public byte? DefaultPaymentTerms { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}

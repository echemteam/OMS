using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Organization
{
    public class GetOrganizationAccountingDetailsResponse
    { 
        public byte? OrganizationAccountingDetailId { get; set; }
        public decimal? CreditLimit { get; set; }
    }
}

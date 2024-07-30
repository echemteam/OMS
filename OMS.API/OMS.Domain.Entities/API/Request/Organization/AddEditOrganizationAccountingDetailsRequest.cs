using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.Organization
{
    public class AddEditOrganizationAccountingDetailsRequest
    {
        public short? OrganizationAccountingDetailId {  get; set; }
        public float? CreditLimit {  get; set; }
    }
}

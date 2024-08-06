using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllCustomerResponse
    {
        public int? CustomerId { get; set; }
        public string? Name { get; set; }
        public bool? IsBuyingForThirdParty {  get; set; }
        public DateTime? CreatedAt { get; set; }
        public int? StatusId {  get; set; }
        public string? StatusName { get; set; }

    }
}

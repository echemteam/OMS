using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.User
{
    public class GetUnassignRoleByUserIdResponse
    {
        public short? RoleId { get; set; }
        public string? RoleName { get; set; }
        public int? UserRoleId {  get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.User
{
    public class AddAssignRoleToUserRequest
    {
        public short? UserId { get; set; }
        public byte? RoleId { get; set; }
    }
}

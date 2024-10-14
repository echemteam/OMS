using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.Entity.User
{
    public class AssignUserDTO : UserDto
    {
        public byte RoleId { get; set; }    
        public int UserRoleId { get; set; }
    }
}

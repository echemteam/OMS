using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Response.User
{
    public class GetAllUserResponse
    {   
        public short? UserId { get; set; }
        public string? FullName { get; set; }
    }
}

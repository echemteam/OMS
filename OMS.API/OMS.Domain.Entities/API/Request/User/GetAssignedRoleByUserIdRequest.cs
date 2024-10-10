using OMS.Domain.Entities.Entity.CommonEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Entities.API.Request.User
{
    public class GetAssignedRoleByUserIdRequest : ListEntityRequest<BaseFilter>
    {
        public short? UserId { get; set; }
    }
}

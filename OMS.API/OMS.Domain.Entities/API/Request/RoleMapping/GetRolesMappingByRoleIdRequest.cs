using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.RoleMapping
{
    public class GetRolesMappingByRoleIdRequest : ListEntityRequest<BaseFilter>
    {
        public byte? RoleId { get; set; }
    }
}

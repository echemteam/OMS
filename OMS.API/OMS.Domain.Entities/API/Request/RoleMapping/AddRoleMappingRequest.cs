using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.API.Request.RoleMapping
{
    public class AddRoleMappingRequest
    {
        public byte? RoleId { get; set; }
        public short? UserId { get; set; }
    }
}

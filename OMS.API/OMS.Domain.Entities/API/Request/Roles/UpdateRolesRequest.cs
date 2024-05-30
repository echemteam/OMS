using System.ComponentModel.DataAnnotations.Schema;

namespace OMS.Domain.Entities.API.Request.Roles
{
    public class UpdateRolesRequest
    {
        public byte? RoleId { get; set; }
        public string? RoleName { get; set; }
    }
}

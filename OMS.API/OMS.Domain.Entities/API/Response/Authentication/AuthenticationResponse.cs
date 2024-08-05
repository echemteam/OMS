using OMS.Domain.Entities.API.Response.Approval;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Roles;

namespace OMS.Domain.Entities.API.Response.Authentication
{
    public class AuthenticationResponse
    {
        public UserDetails? User { get; set; }
        public TokenDetails? Token { get; set; }
        public bool IsAuthenticated { get; set; }
        public string? Message { get; set; }
        public int? SessionTimeout { get; set; }
        public List<SecurityPermissionsDetails> securityPermissions { get; set; }
        public List<GetApprovalConfigurationResponse> ApprovalRulesConfiguration { get; set; }
        public BaseRolesDTO? Roles { get; set; }
    }
}

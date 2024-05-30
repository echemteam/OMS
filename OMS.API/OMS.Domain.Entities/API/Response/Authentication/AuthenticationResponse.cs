using OMS.Domain.Entities.Entity.CommonEntity;

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
    }
}

using OMS.Domain.Repository.Contract;

namespace OMS.Domain.Repository
{
    public interface IRepositoryManager
    {
        ITestRepository test { get; }
        IAuthenticationRepository authentication { get; }
        IUserRepository user { get; }
        IRolesRepository roles {get; }
        IRolesMappingRepository rolesMapping { get; }
        ISecurityPermissionRepository securityPermission { get; }
        ICommonRepository commonRepository { get; }
        ICustomersRepository customers { get; }
        IAddressRepository address { get; }
    }
}

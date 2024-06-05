using OMS.Domain.Repository.Contract;
using OMS.Domain.Repository.Implementation;
using OMS.Shared.DbContext;

namespace OMS.Domain.Repository
{
    public class RepositoryManager : IRepositoryManager
    {
        public readonly DapperContext _context;

        public RepositoryManager(DapperContext dapperContext)
        {
            _context = dapperContext;
        }

        ITestRepository? _test;
        IAuthenticationRepository _authentication;
        IUserRepository _userRepository;
        IRolesRepository _rolesRepository;
        IRolesMappingRepository _rolesMappingRepository;
        ISecurityPermissionRepository _securityPermissionRepository;
        ICommonRepository _commonRepository;
        ICustomersRepository _customers;

        public ITestRepository test
        {
            get
            {
                if (_test == null)
                {
                    _test = new TestRepository(_context);
                }
                return _test;
            }
        }

        public IAuthenticationRepository authentication
        {
            get
            {
                if (_authentication == null)
                {
                    _authentication = new AuthenticationRepository(_context);
                }
                return _authentication;
            }
        }
        public IUserRepository user
        {
            get
            {
                if (_userRepository == null)
                {
                    _userRepository = new UserRepository(_context);
                }
                return _userRepository;
            }
        }

        public IRolesRepository roles
        {
            get
            {
                if (_rolesRepository == null)
                {
                    _rolesRepository = new RolesRepository(_context);
                }
                return _rolesRepository;
            }
        }

        public IRolesMappingRepository rolesMapping
        {
            get
            {
                if (_rolesMappingRepository == null)
                {
                    _rolesMappingRepository = new RolesMappingRepository(_context);
                }
                return _rolesMappingRepository;
            }
        }
        public ISecurityPermissionRepository securityPermission
        {
            get
            {
                if (_securityPermissionRepository == null)
                {
                    _securityPermissionRepository = new SecurityPermissionRepository(_context);
                }
                return _securityPermissionRepository;
            }
        }

        public ICommonRepository commonRepository
        {
            get
            {
                if (_commonRepository == null)
                {
                    _commonRepository = new CommonRepository(_context);
                }
                return _commonRepository;
            }
        }

        public ICustomersRepository customers
        {
            get
            {
                if (_customers== null)
                {
                    _customers= new CustomersRepository(_context);
                }
                return _customers;
            }
        }
    }
}

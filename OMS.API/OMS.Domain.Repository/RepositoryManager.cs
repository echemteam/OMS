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
        ICustomersRepository _customersRepository;
        IAddressRepository _addressRepository;
        IContactRepository _contactRepository;
        ICustomerNotesRepository _customerNotesRepository;
        ICustomerAccountingSettingsRepository _customerAccountingSettingsRepository;
        IEmailAddressRepository _emailAddressRepository;
        IPhoneNumberRepository _phoneNumberRepository;
        ICustomerDocumentsRepository _customerDocumentsRepository;
        ISupplierRepository _supplierRepository;
        ISupplierdocuementsRepositery _supplierdocuementsRepositery;
        ISupplierNotesRepository _supplierNotesRepository;
        IApprovalRepository _approvalRepository;
        
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
                if (_customersRepository== null)
                {
                    _customersRepository= new CustomersRepository(_context);
                }
                return _customersRepository;
            }
        }

        public IAddressRepository address
        {
            get
            {
                if (_addressRepository == null)
                {
                    _addressRepository = new AddressRepository(_context);
                }
                return _addressRepository;
            }
        }

        public IContactRepository contact
        {
            get
            {
                if (_contactRepository == null)
                {
                    _contactRepository = new ContactRepository(_context);
                }
                return _contactRepository;
            }
        }
        public ICustomerNotesRepository customerNotes
        {
            get
            {
                if (_customerNotesRepository == null)
                {
                    _customerNotesRepository = new CustomerNotesRepository(_context);
                }
                return _customerNotesRepository;
            }
        }
        public ICustomerAccountingSettingsRepository customerAccountingSettings 
        {
            get
            {
                if (_customerAccountingSettingsRepository == null)
                {
                    _customerAccountingSettingsRepository = new CustomerAccountingSettingsRepository(_context);
                }
                return _customerAccountingSettingsRepository;
            }
        }
        public IEmailAddressRepository emailAddress
        {
            get
            {
                if (_emailAddressRepository == null)
                {
                    _emailAddressRepository = new EmailAddressRepository(_context);
                }
                return _emailAddressRepository;
            }
        } 
        
        public IPhoneNumberRepository phoneNumber
        {
            get
            {
                if (_phoneNumberRepository == null)
                {
                    _phoneNumberRepository = new PhoneNumberRepository(_context);
                }
                return _phoneNumberRepository;
            }
        }

        public ICustomerDocumentsRepository customerDocuments
        {
            get
            {
                if (_customerDocumentsRepository == null)
                {
                    _customerDocumentsRepository = new CustomerDocumentsRepository(_context);
                }
                return _customerDocumentsRepository;
            }
        }

        public ISupplierRepository supplier
        {
            get
            {
                if (_supplierRepository == null)
                {
                    _supplierRepository = new SupplierRepository(_context);
                }
                return _supplierRepository;
            }
        }
        public ISupplierdocuementsRepositery supplierdocuements
        {
            get
            {
                if (_supplierdocuementsRepositery == null)
                {
                    _supplierdocuementsRepositery = new SupplierdocuementsRepositery(_context);
                }
                return _supplierdocuementsRepositery;
            }
        }

        public ISupplierNotesRepository supplierNotes
        {
            get
            {
                if (_supplierNotesRepository == null)
                {
                    _supplierNotesRepository = new SupplierNotesRepository(_context);
                }
                return _supplierNotesRepository;
            }
        }
        public IApprovalRepository approval
        {
            get
            {
                if (_approvalRepository == null)
                {
                    _approvalRepository = new ApprovalRepository(_context);
                }
                return _approvalRepository;
            }
        }
    }
}

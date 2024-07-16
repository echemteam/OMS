using OMS.Domain.Repository.Contract;

namespace OMS.Domain.Repository
{
    public interface IRepositoryManager
    {
        ITestRepository test { get; }
        IAuthenticationRepository authentication { get; }
        IUserRepository user { get; }
        IRolesRepository roles { get; }
        IRolesMappingRepository rolesMapping { get; }
        ISecurityPermissionRepository securityPermission { get; }
        ICommonRepository commonRepository { get; }
        ICustomersRepository customers { get; }
        IAddressRepository address { get; }
        IContactRepository contact { get; }
        ICustomerNotesRepository customerNotes { get; }
        ICustomerAccountingSettingsRepository customerAccountingSettings { get; }
        IEmailAddressRepository emailAddress { get; }
        IPhoneNumberRepository phoneNumber { get; }
        ICustomerDocumentsRepository customerDocuments { get; }
        ISupplierRepository supplier { get; }
        ISupplierdocuementsRepositery supplierdocuements { get; }
        ISupplierNotesRepository supplierNotes { get; }
        IApprovalRepository approval { get; }
        IApprovalConfigurationRepository approvalConfiguration { get; }
        IApiProviderRepository apiProvider { get; }
        IApiEndpointRepository apiEndpoint { get; }
        IApiParameterRepository apiParameter { get; }
    }
}

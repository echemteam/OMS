using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.API.Response.Supplier;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomersRepository
    {
        Task<AddEditResponse> AddEditCustomersBasicInformation(CustomersDTO customers);
        Task<AddEntityDTO<int>> UpdateCustomersBasicInformation(CustomersDTO customers);
        Task<GetCustomersBasicInformationByIdResponse> GetCustomersBasicInformationById(int customerId);
        Task<EntityList<GetCustomersResponse>> GetCustomers(GetCustomersRequest queryRequest);
        Task<AddEntityDTO<int>> CheckCustomerNameExist(CustomersDTO customers);
        Task<AddEntityDTO<int>> UpdateCustomerApproveStatus(CustomersDTO customers);
        Task<AddEntityDTO<int>> UpdateCustomerInActiveStatus(CustomersDTO customers);
        Task<AddEntityDTO<int>> UpdateCustomerStatus(CustomersDTO customers);
        Task<AddEntityDTO<int>> AddAddressForCustomer(AddAddressForCustomerRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateAddressForCustomer(UpdateAddressForCustomerRequest requestData, short updatedBy);
        Task<EntityList<GetCustomerAuditHistoryByCustomerIdResponse>> GetCustomerAuditHistoryByCustomerId(GetCustomerAuditHistoryByCustomerIdRequest queryRequest);
        Task<AddEntityDTO<int>> AddEditContactForCustomer(AddEditContactForCustomerRequest requestData, short createdBy);
        Task<List<GetCustomersDetailsByCutomerNameResponse>> GetCustomersDetailsByCutomerName(string customerName);
        Task<AddEntityDTO<bool>> UpdateCustomerSubCompany(UpdateCustomerSubCompanyRequest requestData);
    }
}

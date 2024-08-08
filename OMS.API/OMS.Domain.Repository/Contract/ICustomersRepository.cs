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
        Task<AddEditResponse> AddEditCustomersBasicInformation(CustomersDto customers);
        Task<AddEntityDto<int>> UpdateCustomersBasicInformation(CustomersDto customers);
        Task<GetCustomersBasicInformationByIdResponse> GetCustomersBasicInformationById(int customerId);
        Task<EntityList<GetCustomersResponse>> GetCustomers(GetCustomersRequest queryRequest);
        Task<AddEntityDto<int>> CheckCustomerNameExist(CustomersDto customers);
        Task<AddEntityDto<int>> UpdateCustomerApproveStatus(CustomersDto customers);
        Task<AddEntityDto<int>> UpdateCustomerInActiveStatus(CustomersDto customers);
        Task<AddEntityDto<int>> UpdateCustomerStatus(CustomersDto customers);
        Task<AddEntityDto<int>> AddAddressForCustomer(AddAddressForCustomerRequest requestData, short createdBy);
        Task<AddEntityDto<int>> UpdateAddressForCustomer(UpdateAddressForCustomerRequest requestData, short updatedBy);
        Task<EntityList<GetCustomerAuditHistoryByCustomerIdResponse>> GetCustomerAuditHistoryByCustomerId(GetCustomerAuditHistoryByCustomerIdRequest queryRequest);
        Task<AddEntityDto<int>> AddEditContactForCustomer(AddEditContactForCustomerRequest requestData, short createdBy);
        Task<List<GetCustomersDetailsByCutomerNameResponse>> GetCustomersDetailsByCutomerName(string customerName);
        Task<AddEntityDto<bool>> UpdateCustomerSubCustomer(UpdateCustomerSubCustomerRequest requestData);
        Task<AddEntityDto<int>> AddSubCustomer(AddSubCustomerRequest requestData);
        Task<EntityList<GetSubCustomerByCustomerIdResponse>> GetSubCustomerByCustomerId(GetSubCustomerByCustomerIdRequest requestData);
        Task<AddEntityDto<int>> DeleteSubCustomer(int subCustomerMainCustomerId, short deletedBy);
    }
}

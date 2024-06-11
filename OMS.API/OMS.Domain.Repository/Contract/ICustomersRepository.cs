using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Customers;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface ICustomersRepository
    {
        Task<AddEntityDTO<int>> AddCustomersBasicInformation(CustomersDTO customers);
        Task<AddEntityDTO<int>> UpdateCustomersBasicInformation(CustomersDTO customers);
        Task<GetCustomersBasicInformationByIdResponse> GetCustomersBasicInformationById(int customerId);
        Task<EntityList<GetCustomersResponse>> GetCustomers(GetCustomersRequest queryRequest);
    }
}

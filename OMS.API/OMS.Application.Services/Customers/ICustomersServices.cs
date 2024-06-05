using OMS.Domain.Entities.API.Request.Customers;
using OMS.Domain.Entities.API.Response.Customers;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.Customers
{
    public interface ICustomersServices
    {
        Task<AddEntityDTO<int>> AddCustomersBasicInformation(AddCustomersBasicInformationRequest requestData, short CurrentUserId);
        Task<AddEntityDTO<int>> UpdateCustomersBasicInformation(UpdateCustomersBasicInformationRequest requestData, short CurrentUserId);
        Task<GetCustomersBasicInformationByIdResponse> GetCustomersBasicInformationById(int CustomerId);
    }
}

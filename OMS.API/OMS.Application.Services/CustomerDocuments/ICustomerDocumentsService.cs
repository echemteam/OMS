using OMS.Domain.Entities.API.Request.CustomerDocuments;
using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Application.Services.CustomerDocuments
{
    public interface ICustomerDocumentsService
    {
        Task<AddEntityDTO<int>> AddCustomerDocuments(AddCustomerDocumentsRequest requestData, short CurrentUserId);
    }
}

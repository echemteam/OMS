using OMS.Domain.Entities.API.Request.ApiParameter;
using OMS.Domain.Entities.API.Response.ApiParameter;
using OMS.Domain.Entities.Entity.ApiParameter;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IApiParameterRepository
    {
        Task<AddEntityDTO<int>> AddEditApiParameter(ApiParameterDTO apiParameter);
        Task<GetApiParameterByParameterIdResponse> GetApiParameterByParameterId(int parameterId);
        Task<AddEntityDTO<int>> DeleteApiParameter(int parameterId, int deletedBy);
        Task<EntityList<GetApiParametersResponse>> GetApiParameters(GetApiParametersRequest requestData);
    }
}

using OMS.Domain.Entities.API.Request.Functionalities;
using OMS.Domain.Entities.API.Response.Functionalities;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Functionalities;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IFunctionalitiesRepository
    {
        Task<AddEntityDto<int>> AddFunctionalitiesResponsiblesUser(FunctionalitiesResponsiblesDto requestData);
        Task<AddEntityDto<int>> DeleteFunctionalitiesResponsiblesUser(int functionalitiesResponsiblesId);
        Task<EntityList<GetFunctionalitiesResponsiblesResponse>> GetFunctionalitiesResponsibles(GetFunctionalitiesResponsiblesRequest requestData);
        Task<AddEntityDto<int>> AddEditFunctionalities(FunctionalitiesDto requestData);
    }
}

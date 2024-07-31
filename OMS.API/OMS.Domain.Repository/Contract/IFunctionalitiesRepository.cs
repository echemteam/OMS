using OMS.Domain.Entities.API.Request.Functionalities;
using OMS.Domain.Entities.API.Response.Functionalities;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Functionalities;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface IFunctionalitiesRepository
    {
        Task<AddEntityDTO<int>> AddFunctionalitiesResponsiblesUser(FunctionalitiesResponsiblesDTO requestData);
        Task<AddEntityDTO<int>> DeleteFunctionalitiesResponsiblesUser(int functionalitiesResponsiblesId);
        Task<EntityList<GetFunctionalitiesResponsiblesResponse>> GetFunctionalitiesResponsibles(GetFunctionalitiesResponsiblesRequest requestData);
    }
}

using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.Functionalities
{
    public class GetFunctionalitiesResponsiblesRequest : ListEntityRequest<BaseFilter>
    {
        public int? FunctionalityId { get; set; }
    }
}

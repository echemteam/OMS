using OMS.Domain.Entities.Entity.CommonEntity;

namespace OMS.Domain.Entities.API.Request.Snippet
{
    public class GetAssignedSnippetByEmailTemplateIdRequest : ListEntityRequest<BaseFilter>
    {
        public int? EmailTemplateId { get; set; }
    }
}

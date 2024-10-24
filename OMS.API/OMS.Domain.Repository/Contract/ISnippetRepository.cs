using OMS.Domain.Entities.API.Request.Snippet;
using OMS.Domain.Entities.API.Response.Snippet;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Snippet;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Domain.Repository.Contract
{
    public interface ISnippetRepository
    {
        Task<AddEntityDto<int>> AddSnippet(SnippetDto requestData);
        Task<AddEntityDto<int>> UpdateSnippet(SnippetDto requestData);
        Task<AddEntityDto<int>> DeleteSnippet(byte snippetId, short deletedBy);
        Task<EntityList<GetSnippetsResponse>> GetSnippets(ListEntityRequest<BaseFilter> requestData);
        Task<GetSnippetsBySnippetIdResponse> GetSnippetsBySnippetId(byte snippetId);
        Task<AddEntityDto<int>> DeleteAssignedSnippetBySnippetEmailTemplateId(int snippetEmailTemplateId, short deletedBy);
        Task<AddEntityDto<int>> AddAssignedSnippet(SnippetEmailTemplateDto requestData);
        Task<EntityList<GetAssignedSnippetByEmailTemplateIdResponse>> GetAssignedSnippetByEmailTemplateId(GetAssignedSnippetByEmailTemplateIdRequest requestData);
        Task<List<GetSnippetEmailSnippetByEmailTemplateIdResponse>> GetSnippetEmailSnippetByEmailTemplateId(int emailTemplateId);
    }
}

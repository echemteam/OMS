
using OMS.Domain.Entities.API.Request.Snippet;
using OMS.Domain.Entities.API.Response.Snippet;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Shared.Entities.CommonEntity;

namespace OMS.Application.Services.Snippet
{
    public interface ISnippetServices
    {
        Task<AddEntityDto<int>> AddSnippet(AddSnippetRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> UpdateSnippet(UpdateSnippetRequest requestData, short CurrentUserId);
        Task<AddEntityDto<int>> DeleteSnippet(byte snippetId, short deletedBy);
        Task<EntityList<GetSnippetsResponse>> GetSnippets(ListEntityRequest<BaseFilter> requestData);
        Task<GetSnippetsBySnippetIdResponse> GetSnippetsBySnippetId(byte snippetId);
        Task<AddEntityDto<int>> DeleteAssignedSnippetBySnippetEmailTemplateId(int snippetEmailTemplateId, short deletedBy);
        Task<AddEntityDto<int>> AddAssignedSnippet(AddAssignedSnippetRequest requestData, short CurrentUserId);
        Task<EntityList<GetAssignedSnippetByEmailTemplateIdResponse>> GetAssignedSnippetByEmailTemplateId(GetAssignedSnippetByEmailTemplateIdRequest requestData);

    }
}

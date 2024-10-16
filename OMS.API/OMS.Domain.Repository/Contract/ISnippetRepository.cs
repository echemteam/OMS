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

    }
}

using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.Snippet;
using OMS.Domain.Entities.API.Response.Snippet;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Snippet;
using OMS.Domain.Repository;
using OMS.Shared.Entities.CommonEntity;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.Snippet
{
    public class SnippetServices : BaseServices, ISnippetServices
    {
        #region variable 
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region Constructor
        public SnippetServices(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {

        }
        #endregion
        #region Snippet Services
        public async Task<AddEntityDto<int>> AddSnippet(AddSnippetRequest requestData, short CurrentUserId)
        {
            SnippetDto snippetDto = requestData.ToMapp<AddSnippetRequest, SnippetDto>();
            snippetDto.CreatedBy = CurrentUserId;

            return await repositoryManager.snippet.AddSnippet(snippetDto);
        }

        public async Task<AddEntityDto<int>> UpdateSnippet(UpdateSnippetRequest requestData, short CurrentUserId)
        {
            SnippetDto snippetDto = requestData.ToMapp<UpdateSnippetRequest, SnippetDto>();
            snippetDto.UpdatedBy = CurrentUserId;
            return await repositoryManager.snippet.UpdateSnippet(snippetDto);
        }

        public async Task<AddEntityDto<int>> DeleteSnippet(byte snippetId, short deletedBy)
        {
            return await repositoryManager.snippet.DeleteSnippet(snippetId, deletedBy);
        }

        public async Task<EntityList<GetSnippetsResponse>> GetSnippets(ListEntityRequest<BaseFilter> requestData)
        {
            var snippetsDetails = await repositoryManager.snippet.GetSnippets(requestData);
            return snippetsDetails;
        }

        public async Task<GetSnippetsBySnippetIdResponse> GetSnippetsBySnippetId(byte snippetId)
        {
            return await repositoryManager.snippet.GetSnippetsBySnippetId(snippetId);
        }
        public async Task<AddEntityDto<int>> DeleteAssignedSnippetBySnippetEmailTemplateId(int snippetEmailTemplateId, short deletedBy)
        {
            return await repositoryManager.snippet.DeleteAssignedSnippetBySnippetEmailTemplateId(snippetEmailTemplateId, deletedBy);
        }
        public async Task<AddEntityDto<int>> AddAssignedSnippet(AddAssignedSnippetRequest requestData, short CurrentUserId)
        {
            SnippetEmailTemplateDto snippetEmailTemplateDto = requestData.ToMapp<AddAssignedSnippetRequest, SnippetEmailTemplateDto>();
            snippetEmailTemplateDto.CreatedBy = CurrentUserId;

            return await repositoryManager.snippet.AddAssignedSnippet(snippetEmailTemplateDto);
        }
        public async Task<EntityList<GetAssignedSnippetByEmailTemplateIdResponse>> GetAssignedSnippetByEmailTemplateId(GetAssignedSnippetByEmailTemplateIdRequest requestData)
        {
            var getAssignedSnippetByEmailTemplateIdResponse = await repositoryManager.snippet.GetAssignedSnippetByEmailTemplateId(requestData);
            return getAssignedSnippetByEmailTemplateIdResponse!;
        }
        #endregion
    }
}

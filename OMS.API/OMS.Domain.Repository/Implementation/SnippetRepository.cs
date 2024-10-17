using OMS.Domain.Entities.API.Request.Snippet;
using OMS.Domain.Entities.API.Response.Snippet;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Snippet;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using OMS.Shared.Entities.CommonEntity;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class SnippetRepository : BaseRepository<Snippet>, ISnippetRepository
    {
        #region SP Name
        const string ADDSNIPPET = "AddSnippet";
        const string UPDATESNIPPET = "UpdateSnippet";
        const string DELETESNIPPET = "DeleteSnippet";
        const string GETSNIPPETS = "GetSnippets";
        const string GETSNIPPETSBYSNIPPETID = "GetSnippetsBySnippetId";
        const string DELETEASSIGNEDSNIPPETBYSNIPPETEMAILTEMPLATEID = "DeleteAssignedSnippetBySnippetEmailTemplateId";
        const string ADDASSIGNEDSNIPPET = "AddAssignedSnippet";
        const string GETASSIGNEDSNIPPETBYEMAILTEMPLATEID = "GetAssignedSnippetByEmailTemplateId";
        #endregion

        public SnippetRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        #region Snippet Repository
        public async Task<AddEntityDto<int>> AddSnippet(SnippetDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDSNIPPET, new
            {
                requestData.Name,
                requestData.Hashtag,
                requestData.Body,
                requestData.IsActive,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> UpdateSnippet(SnippetDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATESNIPPET, new
            {
                requestData.SnippetId,
                requestData.Name,
                requestData.Hashtag,
                requestData.Body,
                requestData.IsActive,
                requestData.UpdatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> DeleteSnippet(byte snippetId, short deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETESNIPPET, new
            {
                snippetId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<GetSnippetsResponse>> GetSnippets(ListEntityRequest<BaseFilter> requestData)
        {
            return await _context.GetListSP<GetSnippetsResponse>(GETSNIPPETS, new
            {
                requestData.Pagination!.PageNumber,
                requestData.Pagination.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }

        public async Task<GetSnippetsBySnippetIdResponse> GetSnippetsBySnippetId(byte snippetId)
        {
            GetSnippetsBySnippetIdResponse rolesdetils = await _context.GetFrist<GetSnippetsBySnippetIdResponse>(GETSNIPPETSBYSNIPPETID, new
            {
                snippetId
            }, CommandType.StoredProcedure);
            return rolesdetils;
        }
        public async Task<AddEntityDto<int>> DeleteAssignedSnippetBySnippetEmailTemplateId(int snippetEmailTemplateId, short deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETEASSIGNEDSNIPPETBYSNIPPETEMAILTEMPLATEID, new
            {
                snippetEmailTemplateId,
                deletedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<AddEntityDto<int>> AddAssignedSnippet(SnippetEmailTemplateDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDASSIGNEDSNIPPET, new
            {
                requestData.EmailTemplateId,
                requestData.SnippetId,
                requestData.CreatedBy,
            }, CommandType.StoredProcedure);
        }

        public async Task<EntityList<GetAssignedSnippetByEmailTemplateIdResponse>> GetAssignedSnippetByEmailTemplateId(GetAssignedSnippetByEmailTemplateIdRequest requestData)
        {
            return await _context.GetListSP<GetAssignedSnippetByEmailTemplateIdResponse>(GETASSIGNEDSNIPPETBYEMAILTEMPLATEID, new
            {
                requestData.EmailTemplateId,
                requestData.Pagination!.PageNumber,
                requestData.Pagination.PageSize,
                requestData.Filters?.SearchText,
                requestData.SortString
            }, true);
        }
        #endregion
    }
}

using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.SupplierNotes;
using OMS.Domain.Entities.API.Response.SupplierNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.SupplierNotes;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;

namespace OMS.Application.Services.SupplierNotes
{
    public class SupplierNotesService : BaseServices, ISupplierNotesService
    {
        #region variable
        public readonly ICommonSettingService _commonSettingService;
        #endregion

        #region constructor
        public SupplierNotesService(IRepositoryManager _repoManager, ICommonSettingService commonSettingServices) : base(_repoManager, commonSettingServices)
        {
        }
        #endregion

        public async Task<AddEntityDto<long>> AddSupplierNotes(AddSupplierNotesRequest requestData, short CurrentUserId)
        {
            SupplierNoteDto supplierNoteDto = requestData.ToMapp<AddSupplierNotesRequest, SupplierNoteDto>();
            supplierNoteDto.CreatedBy = CurrentUserId;
            return await repositoryManager.supplierNotes.AddSupplierNotes(supplierNoteDto);
        }

        public Task<List<GetSupplierNotesBySupplierIdResponse>> GetSupplierNotesBySupplierId(int supplierId)
        {
            return repositoryManager.supplierNotes.GetSupplierNotesBySupplierId(supplierId);
        }


        public async Task<AddEntityDto<long>> UpdateSupplierNotes(UpdateSupplierNotesRequest requestData, short CurrentUserId)
        {
            SupplierNoteDto supplierNotesUpdate = requestData.ToMapp<UpdateSupplierNotesRequest, SupplierNoteDto>();
            supplierNotesUpdate.UpdatedBy = CurrentUserId;
            return await repositoryManager.supplierNotes.UpdateSupplierNotes(supplierNotesUpdate);
        }

    }
}

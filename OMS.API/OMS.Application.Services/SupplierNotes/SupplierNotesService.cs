using Common.Helper.Extension;
using OMS.Application.Services.Implementation;
using OMS.Domain.Entities.API.Request.CustomerNotes;
using OMS.Domain.Entities.API.Request.SupplierNotes;
using OMS.Domain.Entities.API.Response.CustomerNotes;
using OMS.Domain.Entities.API.Response.SupplierNotes;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.CustomerNotes;
using OMS.Domain.Entities.Entity.SupplierNotes;
using OMS.Domain.Repository;
using OMS.Shared.Services.Contract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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

        public async Task<AddEntityDTO<long>> AddSupplierNotes(AddSupplierNotesRequest requestData, short CurrentUserId)
        {
            SupplierNoteDTO supplierNoteDTO = requestData.ToMapp<AddSupplierNotesRequest, SupplierNoteDTO>();
            supplierNoteDTO.CreatedBy = CurrentUserId;
            return await repositoryManager.supplierNotes.AddSupplierNotes(supplierNoteDTO);
        }

        public Task<List<GetSupplierNotesBySupplierIdResponse>> GetSupplierNotesBySupplierId(int supplierId)
        {
            return repositoryManager.supplierNotes.GetSupplierNotesBySupplierId(supplierId);
        }


        public async Task<AddEntityDTO<long>> UpdateSupplierNotes(UpdateSupplierNotesRequest requestData, short CurrentUserId)
        {
            SupplierNoteDTO supplierNotesUpdate = requestData.ToMapp<UpdateSupplierNotesRequest, SupplierNoteDTO>();
            supplierNotesUpdate.UpdatedBy = CurrentUserId;
            return await repositoryManager.supplierNotes.UpdateSupplierNotes(supplierNotesUpdate);
        }

    }
}

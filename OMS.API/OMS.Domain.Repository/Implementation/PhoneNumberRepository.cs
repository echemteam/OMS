﻿using Dapper;
using OMS.Domain.Entities.API.Response.Contact;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Contact;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class PhoneNumberRepository : BaseRepository<Contact>, IPhoneNumberRepository
    {
        #region SP Name
        const string ADDCONTACTPHONE = "AddContactPhone";
        const string DELETECONTACTPHONE = "DeleteContactPhone";
        const string UPDATECONTACTPHONE = "UpdateContactPhone";
        const string GETPHONEBYCONTACTID = "GetPhoneByContactId";
        const string ADDEDITCONTACTPHONE = "AddEditContactPhone";
        #endregion

        public PhoneNumberRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }

        public async Task<AddEntityDto<int>> AddContactPhone(PhoneDto phone)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDCONTACTPHONE, new
            {
                phone.PhoneNumber,
                phone.PhoneCode,
                phone.ContactId,
                phone.PhoneTypeId,
                phone.CreatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> UpdateContactPhone(PhoneDto phone)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(UPDATECONTACTPHONE, new
            {
                phone.PhoneId,
                phone.PhoneCode,
                phone.PhoneNumber,
                phone.UpdatedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<AddEntityDto<int>> DeleteContactPhone(int phoneId, int deletedBy)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(DELETECONTACTPHONE, new
            {
                phoneId,
                deletedBy
            }, CommandType.StoredProcedure);
        }

        public async Task<List<GetPhoneByContactIdResponse>> GetPhoneByContactId(int contactId)
        {
            List<GetPhoneByContactIdResponse> getEmailByContactIdResponse = await _context.GetList<GetPhoneByContactIdResponse>(GETPHONEBYCONTACTID, new
            {
                contactId
            }, commandType: CommandType.StoredProcedure);
            return getEmailByContactIdResponse;

        }

        public async Task<AddEntityDto<int>> AddEditContactPhone(DataTable phoneList, int contactId)
        {
            var parameters = new
            {
                phoneList = phoneList.AsTableValuedParameter("[dbo].[PhoneTypeTable]"),
                contactId
            };
            AddEntityDto<int> responceData = await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITCONTACTPHONE,
            parameters
            , CommandType.StoredProcedure);
            return responceData;
        }
    }
}

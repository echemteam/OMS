using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationBusinessAddressesRepository : BaseRepository<OrganizationBusinessAddresses>, IOrganizationBusinessAddressesRepository
    {
        const string ADDEDITORGANIZATIONBUSINESSADDRESSES = "AddEditOrganizationBusinessAddresses";
        const string GETORGANIZATIONBUSINESSADDRESSES = "GetOrganizationBusinessAddresses";
        public OrganizationBusinessAddressesRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        public async Task<AddEntityDTO<int>> AddEditBusinessAddresses(OrganizationBusinessAddressesDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDTO<int>>(ADDEDITORGANIZATIONBUSINESSADDRESSES, new
            {
                requestData.OrganizationBusinessAddressId,
                requestData.RegisteredAddressId,
                requestData.PhysicalAddressId,
                requestData.RemitToAddressId,
                requestData.BillToAddressId,
                requestData.LabAddressId,
                requestData.WarehouseAddressId,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationBusinessAddressesResponse> GetOrganizationBusinessAddresses()
        {
            GetOrganizationBusinessAddressesResponse organizationBusinessAddress = await _context.GetFrist<GetOrganizationBusinessAddressesResponse>(GETORGANIZATIONBUSINESSADDRESSES, CommandType.StoredProcedure);
            return organizationBusinessAddress;
        }
    }
}

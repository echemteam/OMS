using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using OMS.Domain.Repository.Contract;
using OMS.Prisitance.Entities.Entities;
using OMS.Shared.DbContext;
using System.Data;

namespace OMS.Domain.Repository.Implementation
{
    internal class OrganizationContactDetailsRepository : BaseRepository<OrganizationContactDetails>, IOrganizationContactDetailsRepository
    {
        const string ADDEDITORGANIZATIONCONTACTDETAILS = "AddEditOrganizationContactDetails";
        const string GETORGANIZATIONCONTACTDETAILS = "GetOrganizationContactDetails";
        public OrganizationContactDetailsRepository(DapperContext dapperContext) : base(dapperContext)
        {
        }
        public async Task<AddEntityDto<int>> AddEditOrganizationContactDetails(OrganizationContactDetailsDto requestData)
        {
            return await _context.GetSingleAsync<AddEntityDto<int>>(ADDEDITORGANIZATIONCONTACTDETAILS, new
            {
                requestData.OrganizationContactDetailId,
                requestData.CompanyWebsite,
                requestData.SalesEmail,
                requestData.AccountsEmail,
                requestData.PurchaseEmail,
                requestData.CustomerServiceEmail,
                requestData.SalesPhone,
                requestData.AccountsPhone,
                requestData.TollFreePhone,
                requestData.CreatedBy
            }, CommandType.StoredProcedure);
        }
        public async Task<GetOrganizationContactDetailsResponse> GetOrganizationContactDetails()
        {
            GetOrganizationContactDetailsResponse organizationContactDetails = await _context.GetFrist<GetOrganizationContactDetailsResponse>(GETORGANIZATIONCONTACTDETAILS, CommandType.StoredProcedure);
            return organizationContactDetails;
        }
    }

}

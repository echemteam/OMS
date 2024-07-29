﻿using OMS.Domain.Entities.API.Response.Organization;
using OMS.Domain.Entities.Entity.CommonEntity;
using OMS.Domain.Entities.Entity.Organization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OMS.Domain.Repository.Contract
{
    public interface IOrganizationContactDetailsRepository
    {
        Task<AddEntityDTO<int>> AddEditOrganizationContactDetails(OrganizationContactDetailsDto requestData);
        Task<GetOrganizationContactDetailsResponse> GetOrganizationContactDetails();
    }
}

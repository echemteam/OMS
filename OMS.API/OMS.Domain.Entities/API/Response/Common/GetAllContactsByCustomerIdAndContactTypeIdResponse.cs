﻿namespace OMS.Domain.Entities.API.Response.Common
{
    public class GetAllContactsByCustomerIdAndContactTypeIdResponse
    {
        public int? ContactId { get; set; }
        public string? FullName { get; set; }
        public short? ContactTypeId { get; set; }
        public string? ContactType { get; set; }
    }
}

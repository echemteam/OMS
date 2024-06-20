﻿namespace OMS.Domain.Entities.API.Response.Contact
{
    public class GetContactByCustomerIdResponse
    {
        public int? CustomerContactId { get; set; }
        public int? CustomerId { get; set; }
        public int ContactId { get; set; }
        public short? ContactTypeId { get; set; }
        public string? Type { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public List<GetEmailByContactIdResponse>? EmailAddressLst { get; set; } 
        public List<GetPhoneByContactIdResponse>? PhoneNumberLsit { get; set; } 
    }
}

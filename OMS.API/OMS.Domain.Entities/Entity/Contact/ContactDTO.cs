﻿using OMS.Domain.Entities.Entity.RoleMapping;

namespace OMS.Domain.Entities.Entity.Contact
{
    public class ContactDTO :BaseContactDTO, IContact, IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? CustomerId { get; set; }
        public int? ContactId { get; set; }
        public short? ContactTypeId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
        public DateTime? ApprovedAt { get; set; }
        public short? ApprovedBy { get; set; }
    }
}
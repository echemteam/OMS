﻿namespace OMS.Domain.Entities.Entity.Contact
{
    public class EmailDto : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public int? EmailId { get; set; }
        public string? EmailAddress { get; set; }
        public long? ContactId { get; set; }
        public byte? OwnerTypeId { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }


    }
}

﻿namespace OMS.Domain.Entities.API.Response.SupplierDocuements
{
    public class GetSupplierDocumentsByIdResponse
    {
        public int? SupplierDocumentId { get; set; }
        public string? Name { get; set; }
        public byte? DocumentTypeId { get; set; }
        public string? Type { get; set; }
        public int? SupplierId { get; set; }
        public string? Attachment { get; set; }
        public DateTime? CreatedAt { get; set; }
        public bool IsArchive { get; set; }
    }
}

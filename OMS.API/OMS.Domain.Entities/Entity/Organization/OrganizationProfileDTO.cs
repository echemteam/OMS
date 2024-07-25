namespace OMS.Domain.Entities.Entity.Organization
{
    public class OrganizationProfileDTO : IBaseCreateEntity, IBaseUpdateEntity, IBaseDeleteEntity
    {
        public byte? OrganizationId { get; set; }
        public string? Name { get; set; }
        public string? Logo { get; set; }
        public string? Base64File { get; set; }
        public string? AddressLine1 { get; set; }
        public string? AddressLine2 { get; set; }
        public int? CityId { get; set; }
        public int? StateId { get; set; }
        public short? CountryId { get; set; }
        public int? ZipCode { get; set; }
        public DateTime? CreatedAt { get; set; }
        public short? CreatedBy { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public short? UpdatedBy { get; set; }
        public DateTime? DeletedAt { get; set; }
        public short? DeletedBy { get; set; }
    }
}

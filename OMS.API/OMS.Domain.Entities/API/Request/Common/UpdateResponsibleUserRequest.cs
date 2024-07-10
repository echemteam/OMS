namespace OMS.Domain.Entities.API.Request.Common
{
    public class UpdateResponsibleUserRequest
    {
        /// OwnerId is used to store the CustomerId or SupplierId.
        public int? OwnerId { get; set; }
        /// OwnerType indicates whether the owner is a customer or a supplier.
        public short? OwnerType { get; set; }
        /// ResponsibleUserId represents the ID of the responsible user.
        public short? ResponsibleUserId { get; set; }
    }
}

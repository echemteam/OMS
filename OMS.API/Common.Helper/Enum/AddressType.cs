namespace Common.Helper.Enum
{
    /// <summary>
    /// Represents different types of addresses.
    /// </summary>
    public enum AddressType
    {
        Billing = 1,         // Billing address
        Shipping = 2,        // Shipping address
        AP = 3,              // Accounts Payable address
        Primary = 4,         // Primary address
        HQ = 5,              // Physical Address - HQ (Headquarters)
        Remittance = 6,      // Remittance address
        Bank = 7             // Bank address
    }
}

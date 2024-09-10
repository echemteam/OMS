import { CustomerSupplierStatus } from "../Enums/commonEnums";

export const isCustomerOrSupplierApprovedStatus = (status) => {
    // It's For Customer OR Supplier
    return status === CustomerSupplierStatus.APPROVED;
}
export const FieldSettingType = {
    DISABLED: "isDisabled",
    ISTEXT: "isText",
    MULTISELECT: "isMultiSelect",
    INPUTBUTTON: "isInputButton",
    SECOUNDRYINPUTBUTTON: "isSecoundryInputButton"
}

export const ApprovalEnum = {
    APPROVECUSTOMER: 1,
    APPROVESUPPLIER: 2,
    APPROVESUBCUSTOMER: 3,
}

export const CustomerSupplierTabEnum = {
    BasicInformation: 1,
    Address: 2,
    Contact: 3,
    Documents: 4,
    Setting: 5
}

export const CustomerSettingEnum = {
    FinancialSettings: 0,
    ShippingSettings: 1
}

export const OwnerType = {
    Customer: 1,
    Supplier: 2
}


export const ListShowCustomer = { value: 1, label: "Customer Name" }
export const ListSupplier = { value: 2, label: "Supplier Name" }

export const AuthenticationTypes = {
    APIKey: "APIKey",
    OAuth: "OAuth"
}

export const ApiEndPointMethods = {
    GET: "GET",
    POST: "POST",
}

export const ApiParametersDataTypes = {
    String: "String",
    Number: "Number",
    Boolean: "Boolean",
}

// export const PaymentMethods = [
//     { value: 1, label: "Check" },
//     { value: 2, label: "ACH / Echeck" },
//     { value: 3, label: "Wire" },
//     { value: 4, label: "Credit Card" },
//     { value: 5, label: "" },
//     { value: 6, label: "Other - With noted field" }
// ]

export const PaymentMethodTypes = {
    CHECK: 1,
    ACHECHECK: 2,
    Wire: 3,
    CREDITCARD: 4,
    ADVANCEDCOLLECT: 5,
    OTHERWITHNOTEDIELD: 6
}

export const CountryId = {
    USA: 233
}

export const ModulePathName = {
    Customer: "Customer",
    Supplier: "Supplier"
}

export const MaskingType = {
    CURRENCY: "currency",
    PERCENT: "percent"
}

export const SupplierFinancialSettings = {
    ACHWIRE: 1,
    CREDITCARD: 2,
    CHECK: 3,
    OTHER: 4,
}

export const OrderTabEnum = {
    BasicInformation: 1,
    Contact: 2,
    OrderItem: 3,
}

export const MyTaskStatus = {
    Pending: "Pending",
    Accept: "Accept",
    Reject: "Reject"
}

export const ParameterType = {
    EVENT: "Event",
    PROVIDER: "Provider"
}

export const AddressType = {
    Billing: 1,
    Shipping: 2
}

export const ContactType = {
    Primary: 1,
    EndUser: 2,
    Purchasing: 3,
    InvoiceSubmission: 4,
    InvoiceFollowup: 5,
    AP: 6,
    AccountsReceivable: 7,
    PurchaseOrder: 8,
    SalesDepartment: 9,
    QCDepartment: 10
}

export const OrderInformationField = {
    CustomerName: "CustomerName",
    SubCustomer: "SubCustomer",
    Verify:"Verify"
}
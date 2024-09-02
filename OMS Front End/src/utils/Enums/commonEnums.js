export const FieldSettingType = {
    DISABLED: "isDisabled",
    ISTEXT: "isText",
    MULTISELECT: "isMultiSelect",
    INPUTBUTTON: "isInputButton",
    SECOUNDRYINPUTBUTTON: "isSecoundryInputButton"
}

export const CustomerSupplierStatus = {
    PENDING: 1,
    SUBMITTED: 2,
    APPROVED: 3,
    FREEZE: 4,
    BLOCK: 5,
    DISABLE: 6,
    REJECT: 7
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
    WIRE: 3,
    CREDITCARD: 4,
    ADVANCEDCOLLECT: 5,
    OTHERWITHNOTEDIELD: 6
}

export const CountryId = {
    USA: 233
}

export const ModulePathName = {
    CUSTOMER: "Customer",
    SUPPLIER: "Supplier"
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
    BILLING: 1,
    SHIPPING: 2,
    AP: 3,
    PRIMARY: 4,
    PHYSICALADDRESSHQ: 5,
    REMITTANCEADDRESS: 6,
    BANKADDRESS: 7
}

export const ContactType = {
    PRIMARY: 1,
    ENDUSER: 2,
    PURCHASING: 3,
    INVOICESUBMISSION: 4,
    INVOICEFOLLOWUP: 5,
    AP: 6,
    ACCOUNTSRECEIVABLE: 7,
    PURCHASEORDER: 8,
    SALESDEPARTMENT: 9,
    QCDEPARTMENT: 10
}

export const OrderInformationField = {
    CustomerName: "CustomerName",
    SubCustomer: "SubCustomer",
    Verify: "Verify"
}


export const Docum = {
    CustomerName: "CustomerName",
    SubCustomer: "SubCustomer",
    Verify: "Verify"
}

export const DocumentTypes = {
    TAXORREGISTRATIONDOCUMENT: 1,
    CUSTOMERDETAILSFORM: 2,
    OURSUBMITTEDFORMS: 3,
    SUPPLIERDETAILSFORM: 4
};

export const FieldSettingType = {
    MULTISELECT: "isMultiSelect",
    DISABLED: "isDisabled",
    INPUTBUTTON: "isInputButton",
    SECOUNDRYINPUTBUTTON: "isSecoundryInputButton"
}

export const ApprovalEnum = {
    APPROVECUSTOMER: "1",
    APPROVESUPPLIER: "2"
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

export const AuthenticationTypes={
    APIKey: "APIKey",
    OAuth:"OAuth"

}

export const ApiEndPointMethods={
    GET:"GET",
    POST:"POST",
    PUT:"PUT",
    DELETE:"DELETE"
}

export const ApiParametersDataTypes={
    String:"String",
    Number:"Number",
    Boolean:"Boolean",
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
    Customer : "Customer",
    Supplier : "Supplier"
}
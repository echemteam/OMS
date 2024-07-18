import { FormFieldTypes } from "../../../../data/formFieldType";

export const rulesFormData = {
    initialState: { ruleName: "", moduleId: "" , functionalityId:"", functionalitiesFieldId:"" , roleId: "" , approvalAction:""},
    formFields: [
        {
            id: "ruleName",
            lable: "Rule Name ",
            Field_Name: "Rule Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "ruleName",
            fieldSetting: {
                placeholder: "Enter Rule Name",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "moduleId",
            lable: "Module ",
            Field_Name: "Module",
            fieldType: FormFieldTypes.SELECT,
            dataField: "moduleId",
            fieldSetting: {
                placeholder: "Select Module",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "functionalityId",
            lable: "Functionality ",
            Field_Name: "name",
            fieldType: FormFieldTypes.SELECT,
            dataField: "functionalityId",
            fieldSetting: {
                // isDisabled: true,
                placeholder: "Select Functionality",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "functionalitiesFieldId",
            lable: "Field ",
            Field_Name: "fieldName",
            fieldType: FormFieldTypes.SELECT,
            dataField: "functionalitiesFieldId",
            fieldSetting: {
                // isDisabled: true,
                placeholder: "Select Module",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "roleId",
            lable: "Approver Role ",
            Field_Name: "roleName",
            fieldType: FormFieldTypes.SELECT,
            dataField: "roleId",
            fieldSetting: {
                placeholder: "Select Approver Role",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "approvalAction",
            lable: "Approval Action ",
            Field_Name: "Approval Action",
            fieldType: FormFieldTypes.INPUT,
            dataField: "approvalAction",
            fieldSetting: {
                placeholder: "Enter Approval Action",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};

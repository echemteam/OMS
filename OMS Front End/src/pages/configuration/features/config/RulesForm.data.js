import { FormFieldTypes } from "../../../../data/formFieldType";

export const rulesFormData = {
    initialState: { ruleName: "", moduleId: "" , functionalityId:"" , fieldId:"" , approverRoleId: "" , approvalAction:""},
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
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "functionalityId",
            lable: "Functionality ",
            Field_Name: "Functionality",
            fieldType: FormFieldTypes.SELECT,
            dataField: "functionalityId",
            fieldSetting: {
                placeholder: "Select Functionality",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "fieldId",
            lable: "Field ",
            Field_Name: "Field",
            fieldType: FormFieldTypes.SELECT,
            dataField: "fieldId",
            fieldSetting: {
                placeholder: "Select Module",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "approverRoleId",
            lable: "Approver Role ",
            Field_Name: "Approver Role",
            fieldType: FormFieldTypes.SELECT,
            dataField: "approverRoleId",
            fieldSetting: {
                placeholder: "Select Approver Role",
                allowSpace: true,
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

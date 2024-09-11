import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

export const rulesFormData = {
    initialState: { approvalConfigurationId: 0, ruleName: "", moduleId: "", functionalityId: "",functionalityEventId: "", functionalitiesFieldId: "", roleId: "",isFunctional:false },
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
                maxLength: 65,
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
                containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "functionalityId",
            lable: "Functionality ",
            Field_Name: "name",
            fieldType: FormFieldTypes.SELECT,
            dataField: "functionalityId",
            fieldSetting: {
                isDisabled: true,
                placeholder: "Select Functionality",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "functionalityEventId",
            lable: "Functionality Event",
            Field_Name: "Functionality Event",
            fieldType: FormFieldTypes.SELECT,
            dataField: "functionalityEventId",
            fieldSetting: {
                isDisabled: true,
                placeholder: "Select Functionality Event",
                isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "functionalitiesFieldId",
            lable: "Field ",
            Field_Name: "fieldName",
            fieldType: FormFieldTypes.SELECT,
            dataField: "functionalitiesFieldId",
            fieldSetting: {
                isDisabled: true,
                placeholder: "Select Field",
                isEnableOnChange: true
            },
            // validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 mb-2",
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
            id: "template",
            lable: "Template",
            Field_Name: "Template",
            fieldType: FormFieldTypes.CKEDITOR,
            dataField: "template",
            fieldSetting: {
                placeholder: "",
                allowSpace: true,
                isDisable: false
            },
            // validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 ",
            },
        },
        {
            id: "isFunctional",
            lable: "Is Functional",
            Field_Name: "Is Functional",
            fieldType: FormFieldTypes.CHECKBOX,
            dataField: "isFunctional",
            fieldSetting: {
                placeholder: "",
                allowSpace: true,
                isDisable: true,

            },
            // validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-5 col-xl-5 col-md-12 col-12 col-12 ",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};

export const rulesListData = {
    columns: [
        {
            name: "Module",
            fieldName: "moduleName",
            colStyle: {
                width: "10%",
            },
            allowShort: true,
        },
        {
            name: "Functionality",
            fieldName: "functionalityName",
            colStyle: {
                width: "20%",
            },
            allowShort: true,
        },
        {
            name: "Rule",
            fieldName: "ruleName",
            colStyle: {
                width: "30%",
            },
            allowShort: true,
        },
        {
            name: "Role",
            fieldName: "roleName",
            colStyle: {
                width: "10%",
            },
            allowShort: true,
        },
        {
            name: "Is Functional",
            fieldName: "isFunctional",
            colStyle: {
                width: "15%",
            },
            colType: GridColumnType.CHECKBOX,
            colSettings: {
                //allowCheckbox: true,
                isDisabled: true
            },
        },
        {
            name: "Action",
            colStyle: {
                width: "10%",
            },
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowEdit: true,
            },
        },
    ],

};


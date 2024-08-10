import { FormFieldTypes } from "../../../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../../../data/gridColumnType";

export const AddEditParameterMappingData = {
    // name: "Email From"
    initialState: { eventParameterId: "", providerParameterId: "" },
    formFields: [
        {
            id: "eventParameterId",
            lable: "Event Parameters",
            Field_Name: "eventParameterId",
            fieldType: FormFieldTypes.SELECT,
            dataField: "eventParameterId",
            fieldSetting: {
                placeholder: "Select Event Parameters",
                isEnableOnChange: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },
        {
            id: "providerParameterId",
            lable: "Provider Parameters",
            Field_Name: "providerParameterId",
            fieldType: FormFieldTypes.SELECT,
            dataField: "providerParameterId",
            fieldSetting: {
                placeholder: "Select Provider Parameters",
                isEnableOnChange: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
            },
        },

    ],
    formSetting: {
        isViewOnly: false
    }
};

export const AddEditParameterMappingConfigurationData = {
    columns: [
        {
            name: "Event Parameter",
            fieldName: "eventParameterName",
            colStyle: {
                width: "40%",
            },
            allowShort: true,
        },
        {
            name: "Provider Parameter",
            fieldName: "providerParameterName",
            colStyle: {
                width: "40%",
            },
            allowShort: true,
        },
        {
            name: "Action",
            colStyle: {
                width: "20%",
            },
            colType: GridColumnType.ACTION,
            defaultAction: {
                allowDelete: true,
            },
        },
    ],

};
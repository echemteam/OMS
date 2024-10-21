import { validationTypes } from "../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const AddEditFunctionalData = {
    initialState: { name: "" },
    section: [
        {
            title: "Functional Information Section",
            row: {},
            style: {
                sectionStyle: "row mb-3",
            },
            fields: [
                {
                    id: "name",
                    lable: "Name ",
                    Field_Name: "name",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "name",
                    fieldSetting: {
                        placeholder: "Enter name",
                        allowSpace: true,
                        maxLength: 100
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-input",
                    },
                },
            ]
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};
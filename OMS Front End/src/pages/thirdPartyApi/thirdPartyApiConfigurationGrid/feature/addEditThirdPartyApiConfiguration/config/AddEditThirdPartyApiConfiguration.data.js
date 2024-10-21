import { validationTypes } from "../../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../../data/formFieldType";

export const AddEditThirdPartyApiData = {
    // name: "Email From"
    initialState: { apiEventId: 0, eventName: "", description: "" },
    section: [
        {
            title: "ThirdParty API Information Section",
            row: {},
            style: {
                sectionStyle: "row mb-3",
            },
            fields: [
                {
                    id: "eventName",
                    label: "Event Name ",
                    Field_Name: "Event Name",
                    fieldType: FormFieldTypes.INPUT,
                    dataField: "eventName",
                    fieldSetting: {
                        placeholder: "Enter Event Name",
                        allowSpace: true,
                        maxLength: 100,
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-input",
                    },
                },
                {
                    id: "description",
                    label: "Description",
                    Field_Name: "Description",
                    fieldType: FormFieldTypes.TEXTAREA,
                    dataField: "description",
                    fieldSetting: {
                        placeholder: "Please Enter Description",
                    },
                    validation: [{ type: validationTypes.REQUIRE }],
                    style: {
                        containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
                    },
                }
            ]
        }
    ],
    formSetting: {
        isViewOnly: false
    }
};
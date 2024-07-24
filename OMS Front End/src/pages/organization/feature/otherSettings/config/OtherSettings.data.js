import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OtherSettingsData = {
    // name: "Email From",
    initialState: { organizationOtherSettingId:0 , organizationId:0 , paymentTermId: "" , fedexAccountDetail: "" },
    formFields: [
        {
            id: "paymentTermId",
            lable: "Default Payment Terms ",
            Field_Name: "Default Payment Terms",
            fieldType: FormFieldTypes.SELECT,
            dataField: "paymentTermId",
            fieldSetting: {
              placeholder: "Select Default Payment Terms",
              isEnableOnChange: true
            },
            validation: [{ type: "require" }],
            style: {
              containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
            },
          },
        {
            id: "fedexAccountDetail",
            lable: "Fedex Account Detail ",
            Field_Name: "Fedex Account Detail",
            fieldType: FormFieldTypes.INPUT,
            dataField: "fedexAccountDetail",
            fieldSetting: {
                placeholder: "Enter Fedex Account Detail",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-md-6 mb-3",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }
};

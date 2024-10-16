import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";

export const financialSettingFormData = {
  initialState: {
    paymentTermId: 0,
    paymentMethodId: "",
    poDeliveryMethodId: "",
  },
  section: [
    {
      title: "Financial Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "paymentTermId",
          lable: "Default Payment Terms Template",
          Field_Name: "Default Payment Terms Template",
          fieldType: FormFieldTypes.SELECT,
          dataField: "paymentTermId",
          fieldSetting: {
            placeholder: "Select Default Payment Terms Template",
            isEnableOnChange: true
          },
          style: {
            containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-input",
          },
        },
        {
          id: "paymentMethodId",
          lable: "Payment Method ",
          Field_Name: "Payment Method",
          fieldType: FormFieldTypes.SELECT,
          dataField: "paymentMethodId",
          fieldSetting: {
            placeholder: "Select Payment Method",
            isEnableOnChange: true
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 col-12 mb-input ",
          },
        },
        {
          id: "poDeliveryMethodId",
          lable: "Preferred method of purchase order delivery",
          Field_Name: "Preferred method of purchase order delivery",
          fieldType: FormFieldTypes.SELECT,
          dataField: "poDeliveryMethodId",
          fieldSetting: {
            placeholder: "Select Preferred method of purchase order delivery",
            isEnableOnChange: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12",
          },
        },
      ]
    }
  ],
  formSetting: {
    isViewOnly: false,
  },
};

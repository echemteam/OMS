import { FormFieldTypes } from "../../../../../data/formFieldType";

export const financialSettingFormData = {
  // name: "Email From",
  initialState: {
    defaultPaymentTermsTemplateId: "",
    paymentMethodId: "",
    preferredMethodOfPurchaseOrderDeliveryId: "",
  },
  formFields: [
    {
      id: "defaultPaymentTermsTemplateId",
      lable: "Default Payment Terms Template",
      Field_Name: "Default Payment Terms Template",
      fieldType: FormFieldTypes.SELECT,
      dataField: "defaultPaymentTermsTemplateId",
      fieldSetting: {
        placeholder: "Select Default Payment Terms Template",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12",
      },
    },
    {
      id: "paymentMethodId",
      lable: "Payment Method",
      Field_Name: "Payment Method",
      fieldType: FormFieldTypes.SELECT,
      dataField: "paymentMethodId",
      fieldSetting: {
        placeholder: "Select Payment Method",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12",
      },
    },
    {
      id: "preferredMethodOfPurchaseOrderDeliveryId",
      lable: "Preferred method of purchase order delivery",
      Field_Name: "Preferred method of purchase order delivery",
      fieldType: FormFieldTypes.SELECT,
      dataField: "preferredMethodOfPurchaseOrderDeliveryId",
      fieldSetting: {
        placeholder: "Select Preferred method of purchase order delivery",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12",
      },
    },

  ],
  formSetting: {
    isViewOnly: false,
  },
};

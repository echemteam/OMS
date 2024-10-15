import { FormFieldTypes } from "../../../../../data/formFieldType";

export const OrganizationAccountingFormData = {
  initialState: { creditLimit: "" },
  section: [
    {
      title: "Accounting Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "creditLimit",
          label: "Credit Limit ",
          Field_Name: "Credit Limit",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "creditLimit",
          fieldSetting: {
            placeholder: "Enter Credit Limit",
            allowSpace: true,
            maxLength: 5
          },
          validation: [{ type: "require" }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-12 col-12 col-12 mb-input",
          },
        },
      ]
    }
  ],
  formSetting: {
    isViewOnly: false
  }
};

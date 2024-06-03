import { FormFieldTypes } from "../../../../data/formFieldType";

export const Stepper3FormData = {
  name: "Email From",
  initialState: { companyName: "" },
  formFields: [
    {
      id: "inputId",
      lable: "Input Text",
      Field_Name: "Text",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Input",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-2",
      },
    },
    {
      id: "dateId",
      lable: "Input Date",
      Field_Name: "Date",
      fieldType: FormFieldTypes.DATEPICKER,
      dataField: "Date",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-2",
      },
    },
    {
      id: "number",
      lable: "Input Number",
      Field_Name: "InputNumber",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "InputNumber",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-2",
      },
    },
    {
      id: "Select",
      lable: "Input Select",
      Field_Name: "InputSelect",
      fieldType: FormFieldTypes.SELECT,
      dataField: "InputSelect",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-2",
      },
    },
    
  ],
};

import { FormFieldTypes } from "../../../../data/formFieldType";

export const testFormData = {
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
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-3",
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
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-3",
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
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-3",
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
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-3",
      },
    },
    {
      id: "FileUploader",
      lable: "File Uploader",
      Field_Name: "File Uploader",
      fieldType: FormFieldTypes.FILE,
      dataField: "FileUploader",
      fieldSetting: {
        placeholder: "placeholder",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-3",
      },
    },
    
    {
      id: "billTO",
      label: "Bill To :",
      fieldName: "Instrument Type",
      fieldType: FormFieldTypes.RADIOBUTTON,
      dataField: "billTo",
      fieldSetting: {
        options: [
          {
            label: "Radio 1",
            value: "Radio1",
            isDisable: false,
            optionClass: "",
          },
          {
            label: "Radio 2",
            value: "Radio 2",
            isDisable: false,
            optionClass: "second-radio",
          },
          // Add more options if needed
        ],
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-3",
      },
    },
    {
      id: "inputCheckbox",
      lable: "Input Checkbox",
      Field_Name: "Input Checkbox",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "InputCheckbox",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-3",
      },
    },
    {
      id: "tinyEditor",
      lable: "TinyEditor",
      Field_Name: "Tiny Editor",
      fieldType: FormFieldTypes.TINYEDITOR,
      dataField: "tinyEditor",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-3",
      },
    },
    {
      id: "TextArea",
      lable: "Text Area",
      Field_Name: "Text Area",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "TextArea",
      fieldSetting: {
        placeholder: "",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-3",
      },
    },
    
  ],
};

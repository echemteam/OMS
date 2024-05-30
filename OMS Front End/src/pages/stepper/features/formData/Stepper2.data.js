import { FormFieldTypes } from "../../../../data/formFieldType";

export const Stepper2FormData = {
  name: "Email From",
  initialState: { companyName: "" },
  formFields: [
    {
      id: "name",
      lable: "Name",
      Field_Name: "Text",
      fieldType: FormFieldTypes.INPUT,
      dataField: "Name",
      fieldSetting: {
        placeholder: "Please Enter Name",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-3",
      },
    },
    {
      id: "DateOfBirth",
      lable: "Date Of Birth",
      Field_Name: "Date",
      fieldType: FormFieldTypes.DATEPICKER,
      dataField: "Date",
      fieldSetting: {
        placeholder: "Please Enter Date Of Birth",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-3",
      },
    },
    {
      id: "number",
      lable: "Phone Number",
      Field_Name: "PhoneNumber",
      fieldType: FormFieldTypes.NUMERIC,
      dataField: "PhoneNumber",
      fieldSetting: {
        placeholder: "Please Enter Phone Number",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-3",
      },
    },
    {
      id: "Select",
      lable: "Select Hobby",
      Field_Name: "SelectHobby",
      fieldType: FormFieldTypes.SELECT,
      dataField: "SelectHobby",
      fieldSetting: {
        placeholder: "Please Select Hobby",
        allowSpace: true,
      },
      // validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-3",
      },
    },
    {
      id: "FileUUploadDocument",
      lable: "Upload Document",
      Field_Name: "File Uploader",
      fieldType: FormFieldTypes.FILE,
      dataField: "FileUploader",
      fieldSetting: {
        placeholder: "Upload Document",
        allowSpace: true,
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
        containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-3 mt-4",
      },
    },
    
  ],
};

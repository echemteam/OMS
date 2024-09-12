import { FormFieldTypes } from "../../../../data/formFieldType";
import { GridColumnType } from "../../../../data/gridColumnType";

export const EmailTemplateFormData = {
  initialState: {
    emailTemplateName:"",subject:"",emailBody:"",isActive:false,
  },
  formFields: [
    {
      id: "emailTemplateName",
      lable: "Email Template Name",
      Field_Name: "Email Template Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "emailTemplateName",
      fieldSetting: {
        placeholder: "Enter Email Template Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2 ",
      },
    },
    {
        id: "subject",
        lable: "Subject",
        Field_Name: "Subject",
        fieldType: FormFieldTypes.INPUT,
        dataField: "subject",
        fieldSetting: {
          placeholder: "Enter Subject",
          allowSpace: true,
        },
        validation: [{ type: "require" }],
        style: {
          containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2 ",
        },
      },
      {
        id: "emailBody",
        lable: "Email Body ",
        Field_Name: "Email Body",
        fieldType: FormFieldTypes.CKEDITOR,
        dataField: "emailBody",
        fieldSetting: {
          placeholder: "Enter Email Body",
          allowSpace: true,
          maxLength: 1000,
        },
        validation: [{ type: "require" }],
        style: {
          containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12  mb-2",
        },
      },
      {
        id: "isActive",
        lable: "Is Active",
        Field_Name: "Is Active",
        fieldType: FormFieldTypes.CHECKBOX,
        dataField: "isActive",
        fieldSetting: {
          placeholder: "",
          allowSpace: true,
        },
        // validation: [{ type: "require" }],
        style: {
          containerCss: "col-xxl-6 col-xl-6 col-md-6 mb-input mt-3 margin-top-checkbox",
        },
      },
  ],
}
export const EmailTemplateGridConfig = {
  columns: [
    {
      name: "Email Template Name",
      fieldName: "emailTemplateName",
      colStyle: {
        width: "30%",
      },
      allowShort: true,
    },
    {
      name: "Subject",
      fieldName: "subject",
      colStyle: {
        width: "30%",
      },
      allowShort: true,
    },
    {
        name: "IsActive",
        fieldName: "isActive",
        colStyle: {
          width: "20%",
        },
        colType: GridColumnType.CHECKBOX,
        // colSettings: {
        //   allowCheckbox: true,
        //   isDisabled: true,
        // },
      },
    {
      name: "Action",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
       
      },
    },
  ],

};
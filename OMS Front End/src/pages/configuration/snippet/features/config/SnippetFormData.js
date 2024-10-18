import { GridColumnType } from "../../../../../components/FinalMolGrid/libs/data/gridColumnType";
import { FormFieldTypes } from "../../../../../data/formFieldType";

export const SnippetListData = {
  initialState: {
     name:"",
     hashtag:"",
     body:"",
     isActive:false
  },
  formFields: [
    {
      id: "name",
      lable: "Name",
      Field_Name: "Name",
      fieldType: FormFieldTypes.INPUT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Name",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2 ",
      },
    },
    {
      id: "hashtag",
      lable: "Hashtag",
      Field_Name: "Hashtag",
      fieldType: FormFieldTypes.INPUT,
      dataField: "hashtag",
      fieldSetting: {
        allowSpace: true,
        // isDisable:true
      },
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-12 mb-2 ",
      },
    },
    
    {
      id: "body",
      lable: "Body",
      Field_Name: "Body",
      fieldType: FormFieldTypes.CKEDITOR,
      dataField: "body",
      fieldSetting: {
        placeholder: "Enter Body",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-6 col-12 mb-2 ",
      },
    },
    {
      id: "isActive",
      lable: "IsActive",
      Field_Name: "Is Active",
      fieldType: FormFieldTypes.CHECKBOX,
      dataField: "isActive",
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-6 col-12 mb-2 ",
      },
    },
  ],
}
export const SnippedGridConfig = {
  columns: [
    {
      name: "Name",
      fieldName: "name",
      colStyle: {
        width: "30%",
      },
      allowShort: true,
    },
    {
      name: "Hashtag",
      fieldName: "hashtag",
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
      },
    {
      name: "Action",
      colStyle: {
        width: "20%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
    },
  ],

};
import { AppIcons } from "../../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../data/gridColumnType";

export const addEditApiEndPointsFormData ={
    initialState:{
        name: "",
        path:"",
        method:"",
        description:"",
    },
    formFields: [
   
        {
            id: "name",
            lable: "Name ",
            Field_Name: "Name",
            fieldType: FormFieldTypes.INPUT,
            dataField: "name",
            fieldSetting: {
                placeholder: "Enter Name",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2 ",
            },
        },
        {
            id: "path",
            lable: "Path",
            Field_Name: "Path",
            fieldType: FormFieldTypes.INPUT,
            dataField: "path",
            fieldSetting: {
                placeholder: "Enter Path",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "method",
            lable: "Method ",
            Field_Name: "Method",
            fieldType: FormFieldTypes.SELECT,
            dataField: "method",
            fieldSetting: {
                placeholder: "Select Method",
                isEnableOnChange: true
            },
            
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
        {
            id: "description",
            lable: "Description",
            Field_Name: "Description",
            fieldType: FormFieldTypes.TEXTAREA,
            dataField: "description",
            fieldSetting: {
                placeholder: "Enter Description",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-12 col-xl-12 col-md-12 col-12 mb-2",
            },
        },
       
    ],
    formSetting: {
        isViewOnly: false
    }

}
export const ApiEndPointGridConfig = {
    columns: [
      
      {
        name: "End Point Name",
        fieldName: "endpointName",
        width: "20%",
        allowShort: true,
      },
      {
        name: "End Point Path",
        fieldName: "path",
        width: "25%",
        allowShort: true,
      },
      {
        name: "End Point Method",
        fieldName: "method",
        width: "20%",
        allowShort: true,
      },
      {
        name: "Description",
        fieldName: "description",
        width: "20%",
        allowShort: true,
      },
      {
        name: "Action",
        width: "15%",
        colType: GridColumnType.ACTION,
        defaultAction: {
          allowEdit: true,
          allowDelete: true,
        },
        customAction: [
            {
                name: "Add Parameter",
                iconName: AppIcons.PlusIcon,
            },
        ],
      },
    ],
  
  };
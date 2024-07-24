import { FormFieldTypes } from "../../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../../data/gridColumnType";


export const addEditApiParameterFormData ={
    initialState:{
    
        name: "",
        dataType:"",
        defaultValue:"",
        isRequired:"",
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
                containerCss: "col-xxl-16 col-xl-6 col-md-6 col-6 mb-2 ",
            },
        },
        {
            id: "dataType",
            lable: "DataType ",
            Field_Name: "DataType",
            fieldType: FormFieldTypes.SELECT,
            dataField: "dataType",
            fieldSetting: {
                placeholder: "Select DataType",
                isEnableOnChange: true
            },
            
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-2",
            },
        },
        {
            id: "defaultValue",
            lable: "Default Value",
            Field_Name: "Default Value",
            fieldType: FormFieldTypes.INPUT,
            dataField: "defaultValue",
            fieldSetting: {
                placeholder: "Enter Default Value",
                allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
                containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-2",
            },
        },
       
        {
            id: "isRequired",
            lable: "Is Required",
            Field_Name: "Is Required",
            fieldType: FormFieldTypes.CHECKBOX,
            dataField: "isRequired",
            fieldSetting: {
              placeholder: "",
              allowSpace: true,
            },
            validation: [{ type: "require" }],
            style: {
              containerCss:
                "col-xxl-6 col-xl-6 col-md-6 col-6 col-6 mb-input margin-left0-checkbox mt-2",
            },
        },
    ],
    formSetting: {
        isViewOnly: false
    }

}

export const ApiParameterGridConfig = {
    columns: [

      {
        name: "Parameter Name",
        fieldName: "name",
        width: "20%",
        allowShort: true,
      },
      {
        name: "Data Type ",
        fieldName: "dataType",
        width: "20%",
        allowShort: true,
      },
      {
        name: "Default Value ",
        fieldName: "defaultValue",
        width: "20%",
        allowShort: true,
      },
      {
        name: "Is Required",
        fieldName: "isRequired",
        width: "20%",
        colType: GridColumnType.CHECKBOX,
        colSettings: {
          allowCheckbox: true,
          allowDisable: true
        },
      },
      {
        name: "Action",
        width: "20%",
        colType: GridColumnType.ACTION,
        defaultAction: {
          allowEdit: true,
          allowDelete: true,
        },
      },
    ],
  };
import { validationTypes } from "../../../../../components/FinalForms/libs/data/ValidationTypes";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { GridColumnType } from "../../../../../data/gridColumnType";

export const initialPhoneTypeState = {
  label: 'Work',
  value: 2
}


export const addEditContactsFormData = {
  name: "Add Edit Role Form",
  initialState: {
    phoneCode: '',
    phoneNumber: '',
    phoneTypeId: initialPhoneTypeState.value,
    extension: 0,
    id: 0,
    isPrimaryPhoneNumber: false
  },
  section: [
    {
      title: "Contact Information Section",
      row: {},
      style: {
        sectionStyle: "col-lg-12 row mb-3",
      },
      fields: [
        {
          id: "phoneTypeId",
          label: "Phone Type",
          Field_Name: "phoneType",
          fieldType: FormFieldTypes.SELECT,
          dataField: "phoneTypeId",
          fieldSetting: {
            placeholder: "Enter Phone Type"
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-input",
          },
        },
        {
          id: "phoneNumber",
          label: "Contact Number",
          Field_Name: "Phone Number",
          fieldType: FormFieldTypes.PHONE,
          dataField: "phoneNumber",
          fieldSetting: {
            placeholder: "Enter Phone Number",
            // defaultCountry: "us",
            allowSpace: true,
          },
          validation: [{ type: validationTypes.REQUIRE }],
          style: {
            containerCss: "col-xxl-6 col-xl-12 col-md-12 mb-input",
          },
        },
        {
          id: "extension",
          label: "",
          Field_Name: "Extension",
          fieldType: FormFieldTypes.NUMERIC,
          dataField: "extension",
          fieldSetting: {
            placeholder: "Extension",
            allowSpace: true,
            minLength: 0,
            maxLength: 6,
          },
          style: {
            containerCss: "col-xxl-3 col-xl-12 col-md-12 mb-input ",
          },
        },
        {
          id: "isPrimaryPhoneNumber",
          label: "Is Primary",
          Field_Name: "isPrimaryPhoneNumber",
          fieldType: FormFieldTypes.CHECKBOX,
          dataField: "isPrimaryPhoneNumber",
          style: {
            containerCss:
              "col-xxl-6 col-xl-6 col-md-12 col-12 col-12 mb-input margin-left0-checkbox",
          },
        }
      ]
    }
  ]
};


export const phoneNumberConfig = {
  columns: [
    {
      name: "Type",
      fieldName: "phoneType",
      colStyle: {
        width: "15%",
      },
      renderCustomCol: (rowData) => {
        return `(${rowData?.["phoneCode"]}) ${rowData?.["phoneNumber"]}`;
      },
    },
    {
      name: "Phone Number",
      fieldName: "phoneNumber",
      // colType: GridColumnType.CUSTOM,
      colStyle: {
        width: "30%",
      },
      renderCustomCol: (rowData) => {
        return `(${rowData?.["phoneCode"]}) ${rowData?.["phoneNumber"]}`;
      },
    },
    {
      name: "Extension",
      colStyle: {
        width: "20%",
      },
      fieldName: "extension"
    },
    {
      name: "Is Primary",
      fieldName: "isPrimary",
      colStyle: {
        width: "15%",
      },
      colType: GridColumnType.CHECKBOX,
      colSettings: {
        allowCheckbox: true,
        allowDisable: true
      },
    },
    {
      name: "Action",
      colStyle: {
        width: "15%",
      },
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDelete: true,
      },
    },
  ]
}
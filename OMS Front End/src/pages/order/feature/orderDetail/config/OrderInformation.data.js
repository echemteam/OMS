import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";

export const orderInformationData = {
  initialState: {
    name: "",
    subName: "",
    poNumber: "",
  },
  formFields: [
    {
      id: "name",
      lable: "Customer Name ",
      Field_Name: "Customer Name",
      fieldType: FormFieldTypes.CUSTOMSELECT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Customer Name",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
        validation: [{ type: "require" }],
        isEnableOnChange: true,
      },
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-input",
      },
      dropdownSettings: {
        colorMap: {
          active: "#00b100",
          pending: "#ffd500",
          blocked: "#ff4c51"
        },
        textMap: {
          active : { text: "Active" },
          pending : { text: "Pending" },
          blocked : { text: "Blocked" }
        },
        iconMap: {
          active : AppIcons.ActiveIcon,
          pending : AppIcons.PendingIcon,
          blocked : AppIcons.BlockedIcon,
        }
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
      }
    },
    {
      id: "subName",
      lable: "Sub-Customer Name",
      Field_Name: "Sub-Customer Name",
      fieldType: FormFieldTypes.CUSTOMSELECT,
      dataField: "name",
      fieldSetting: {
        placeholder: "Enter Sub-Customer Name",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true,
        validation: [{ type: "require" }],
        isEnableOnChange: true,
      },
      style: {
        containerCss: "col-xxl-6 col-xl-6 col-md-6 col-6 mb-input",
      },
      dropdownSettings: {
        colorMap: {
          active: "#00b100",
          pending: "#ffd500",
          blocked: "#ff4c51"
        },
        textMap: {
          active : { text: "Active" },
          pending : { text: "Pending" },
          blocked : { text: "Blocked" }
        },
        iconMap: {
          active : AppIcons.ActiveIcon,
          pending : AppIcons.PendingIcon,
          blocked : AppIcons.BlockedIcon,
        }
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
      }
    },
    {
      id: "poNumber",
      lable: "PO Number ",
      Field_Name: "PO Number",
      fieldType: FormFieldTypes.INPUT,
      dataField: "poNumber",
      fieldSetting: {
        placeholder: "Enter PO Number",
        allowSpace: true,
        maxLength: 50,
        exemptBoundarySpaces: true
      },
      validation: [{ type: "require" }, { type: "uniqueName" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-4 mb-input",
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Verify',
        showInformation: {
          showInputButton: true,
          faIcon: "fa-search",
          title: "PO Number"
        }
      }
    },
    {
      id: "billingAddress",
      lable: "Billing Address ",
      Field_Name: "Billing Address ",
      fieldType: FormFieldTypes.SELECT,
      dataField: "billingAddress",
      fieldSetting: {
        placeholder: "Select Billing Address",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-4 mb-input",
      },
    },
    {
      id: "shippingAddress",
      lable: "Shipping Address ",
      Field_Name: "shipping Address ",
      fieldType: FormFieldTypes.SELECT,
      dataField: "shippingAddress",
      fieldSetting: {
        placeholder: "Select Shipping Address",
        isEnableOnChange: true,
        isMultiSelect: false,
        isDisabled: false,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-4 mb-input",
      },
    },
  ],
};

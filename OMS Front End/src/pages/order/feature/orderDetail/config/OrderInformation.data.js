import { AppIcons } from "../../../../../data/appIcons";
import { FormFieldTypes } from "../../../../../data/formFieldType";
import { AddressType, OrderInformationField } from "../../../../../utils/Enums/commonEnums";

export const orderInformationData = {
  initialState: {
    customerId: "",
    subCustomerMainCustomerId: null,
    poNumber: "",
    isBillingId:"",
    isShippingId:"",
    orderMethodId:""
  },
  formFields: [
    {
      id: "customerId",
      lable: "Customer Name ",
      Field_Name: "Customer Name",
      fieldType: FormFieldTypes.CUSTOMSELECT,
      dataField: "customerId",
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
      validation: [{ type: "require" }],
      dropdownSettings: {
        colorMap: {
          Approved: "#00b100",
          Pending: "#ffd500",
          Block: "#6444d8",
          Disable: "#808080",
          Freeze: "#867bf2",
          Reject: "#ff4c51",
          Submitted: "#06bcd2"
        },
        textMap: {
          Approved: { text: "Approved" },
          Pending: { text: "Pending" },
          Block: { text: "Blocked" },
          Disable: { text: "Disabled" },
          Freeze: { text: "Freezed" },
          Reject: { text: "Rejected" },
          Submitted: { text: "Submitted" },
        },
        iconMap: {
          Approved: AppIcons.ActiveIcon,
          Pending: AppIcons.PendingIcon,
          Block: AppIcons.BlockedIcon,
          Disable: AppIcons.disablethemeIcone,
          Freeze: AppIcons.freezeblueIcone,
          Reject: AppIcons.RejectedIcon,
        }
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
        GetByID: OrderInformationField.CustomerName
      }
    },
    {
      id: "subCustomerMainCustomerId",
      lable: "Sub-Customer Name",
      Field_Name: "Sub-Customer Name",
      fieldType: FormFieldTypes.CUSTOMSELECT,
      dataField: "subCustomerMainCustomerId",
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
          Approved: "#00b100",
          Pending: "#ffd500",
          Block: "#6444d8",
          Disable: "#808080",
          Freeze: "#867bf2",
          Reject: "#ff4c51",
          Submitted: "#06bcd2"
        },
        textMap: {
          Approved: { text: "Approved" },
          Pending: { text: "Pending" },
          Block: { text: "Blocked" },
          Disable: { text: "Disabled" },
          Freeze: { text: "Freezed" },
          Reject: { text: "Rejected" },
          Submitted: { text: "Submitted" },
        },
        iconMap: {
          Approved: AppIcons.ActiveIcon,
          Pending: AppIcons.PendingIcon,
          Block: AppIcons.BlockedIcon,
          Disable: AppIcons.disablethemeIcone,
          Freeze: AppIcons.freezeblueIcone,
          Reject: AppIcons.RejectedIcon,
        }
      },
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
        GetByID: OrderInformationField.SubCustomer

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
      id: "orderMethodId",
      lable: "Order Method ",
      Field_Name: "Order Method",
      fieldType: FormFieldTypes.SELECT,
      dataField: "orderMethodId",
      fieldSetting: {
        isDisabled: false,
        placeholder: "Select Order Method",
        isEnableOnChange: true
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-4 col-xl-4 col-md-4 col-12 mb-input label-name-small",
      },
    },
    {
      id: "isBillingId",
      lable: "Billing Address ",
      Field_Name: "Billing Address ",
      fieldType: FormFieldTypes.SELECT,
      dataField: "isBillingId",
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
      id: "isShippingId",
      lable: "Shipping Address ",
      Field_Name: "shipping Address ",
      fieldType: FormFieldTypes.SELECT,
      dataField: "isShippingId",
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
      inputButtonGroup: {
        isInputButton: true,
        buttonText: 'Add',
        icon: AppIcons.PlusIcon,
        GetByID: AddressType.SHIPPING
      }
    },
  ],
};

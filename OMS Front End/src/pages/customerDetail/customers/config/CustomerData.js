import { FormFieldTypes } from "../../../../data/formFieldType";
import { GridColumnType } from "../../../../data/gridColumnType";

export const reasonData = {
  name: "",
  initialState: { inActiveReason: "" },
  formFields: [
    {
      id: "inActiveReason",
      lable: "Reason :",
      Field_Name: "Reason ",
      fieldType: FormFieldTypes.TEXTAREA,
      dataField: "inActiveReason",
      fieldSetting: {
        placeholder: "please enter Reason",
        allowSpace: true,
      },
      validation: [{ type: "require" }],
      style: {
        containerCss: "col-xxl-12 col-xl-12 col-md-12 mb-2",
      },
    },],
}

export const AllCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name", 
      fieldName: "name",
      width:"32%",
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      width: "25%", 
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      width: "25%",
      colSettings: {
        valueField: "status",
        getLableClass: (value) => {
          switch (value) {
            case "Active":
              return "status-btn badge-gradient-success";
            case "Open":
              return "status-btn badge-gradient-info";
            case "In Active":
              return "status-btn badge-gradient-danger";
            case "Pending":
              return "status-btn badge-gradient-Pending";
            case "In progress":
              return "status-btn badge-gradient-theme";
            case "Submitted":
              return "status-btn badge-gradient-Submitted";
            case "Approved":
              return "status-btn badge-gradient-Approved";
            case "Freeze":
              return "status-btn badge-gradient-Frozen";
            case "Block":
              return "status-btn badge-gradient-Blocked";
            case "Reject":
              return "status-btn badge-gradient-Blocked";
            case "Disable":
              return "status-btn badge-gradient-disabled";

            default:
              return "status-btn badge-gradient-info";
          }
        },
      },
    },
    // {
    //   name: "Progress",
    //   fieldName: "progress",
    //   colType: GridColumnType.PROGRESS,

    // },
    {
      name: "Action",
      colType: GridColumnType.ACTION,
      width: "15%",
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
        allowFreeze: true,
        allowBlocked: true,
        allowReject:true,
      },
    },
  ],
};

export const PendingCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      width:"35%",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      width:"25%",
      // allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "website",
      width:"25%",
      // allowShort: true,
    },
    // {
    //   name: "Progress",
    //   fieldName: "progress",
    //   colType: GridColumnType.PROGRESS,

    // },
    {
      name: "Action",
      width:"15%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
      },
    },
  ],
};

export const SubmittedCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      width:"20%",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "taxId",
      width:"20%",
      // allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "website",
      width:"20%",
      // allowShort: true,
    },
    {
      name: "Approve",
      width:"20%",
      allowShort: false,
      colType: GridColumnType.CHECKBOX,
      // colSettings: {
      //   allowEdit: true,
      // },
    },
    {
      name: "Action",
      width:"20%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
      },
    },
  ],

};

export const ApprovedCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      width:"35%",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      width:"35%",
      fieldName: "taxId",
      // allowShort: true,
    },
    {
      name: "Action",
      width:"30%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
        allowDisable: true,
        allowFreeze: true,
        allowBlocked: true,
        allowReject:true,
      },
    },
  ],
};

export const RejectedCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      width:"35%",
      // allowShort: true,
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
      width:"35%",
      // allowShort: true,
    },
    {
      name: "Action",
      width:"30%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: true,
       
      },
    },
  ],
};


export const AllInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      // allowShort: true,
      width:"25%",
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
      width:"25%",
      // allowShort: true,
    },
    {
      name: "Date",
      width:"25%",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    {
      name: "Status",
      width:"25%",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: (value) => {
          switch (value) {
            case "Active":
              return "status-btn badge-gradient-success";
            case "Open":
              return "status-btn badge-gradient-info";
            case "In Active":
              return "status-btn badge-gradient-danger";
            case "Pending":
              return "status-btn badge-gradient-Pending";
            case "In progress":
              return "status-btn badge-gradient-theme";
            case "Submitted":
              return "status-btn badge-gradient-Submitted";
            case "Approved":
              return "status-btn badge-gradient-Approved";
            case "Freeze":
              return "status-btn badge-gradient-Frozen";
            case "Block":
              return "status-btn badge-gradient-Blocked";
            case "Disable":
              return "status-btn badge-gradient-disabled";

            default:
              return "status-btn badge-gradient-info";
          }
        },
      },
    },
  ],
};

export const FreezedInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      width:"25%",
    },
    {
      name: "Reason",
      fieldName: "inActiveReason",
      width:"25%",
    },
    {
      name: "Date",
      width:"25%",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    {
      name: "Action",
      width:"25%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
        allowUnfreeze: true,
      },
    },
  ],
};

export const BlockedInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      width:"25%",
    },
    {
      name: "Reason",
      width:"25%",
      fieldName: "inActiveReason",
    },
    {
      name: "Date",
      width:"25%",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    {
      name: "Action",
      width:"25%",
      colType: GridColumnType.ACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
        allowUnfreeze: false,
        allowUnblocked: true,
      },
    },
  ],
};

export const DisabledInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "name",
      width:"35%",
    },
    {
      name: "Reason",
      width:"35%",
      fieldName: "inActiveReason",
    },
    {
      name: "Date",
      width:"30%",
      fieldName: "updatedAt",
      colType: GridColumnType.DATE,
      colSettings: {
        isUTC: true,
        format: "DD/MM/YYYY hh:mm A ",
      },
    },
    // {
    //   name: "Action",
    //   width:"25%",
    //   colType: GridColumnType.ACTION,
    //   defaultAction: {
    //     allowEdit: false,
    //     allowDelete: false,
    //     allowUnfreeze: false,
    //     allowUnblocked: false,
    //     allowActiveCustomer: true,
    //   },
    // },
  ],
};
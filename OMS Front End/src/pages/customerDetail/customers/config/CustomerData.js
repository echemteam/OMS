import { GridColumnType } from "../../../../data/gridColumnType";

export const AllCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: (value) => {
          switch (value) {
            case "Active":
              return "badge-gradient-success";
            case "Open":
              return "badge-gradient-info";
            case "In Active":
              return "badge-gradient-danger";
            case "Pending":
              return "badge-gradient-warning";

            case "In progress":
              return "badge-gradient-theme";

            default:
              return "badge-gradient-info";
          }
        },
      },
    },
    {
      name: "Progress",
      fieldName: "progress",
      colType: GridColumnType.PROGRESS,
     
    },
    {
      name: "Action",
      colType: GridColumnType.MULACTION,
      defaultAction: {
        allowEdit: false,
        allowDelete: false,
      },
      customDropdownActions: [
        { name: "Edit", path: "/" , id:1},
        { name: "Disable", path: "/" , id:2 },
        { name: "Freeze", path: "/" , id:3},
        { name: "Block", path: "/", id:4 },
      ],
    },
  ],
};

export const PendingCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "firstName",
      // allowShort: true,
    },
    // {
    //   name: "IsActive",
    //   fieldName: "isActive",
    //   colType: GridColumnType.CHECKBOX,
    //   colSettings: {
    //     valueField: "isActive",
    //     getLableClass: (value) => {
    //       switch (value) {
    //         case true:
    //           return "info";
    //         case false:
    //           return "danger";
    //         default:
    //           return "secondary";
    //       }
    //     },
    //   },
    // },
    // {
    //   name: "Action",
    //   colType: GridColumnType.ACTION,
    //   defaultAction: {
    //     allowEdit: true,
    //     allowDelete: true,
    //   },

    // },
  ],
};

export const SubmittedCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "firstName",
      // allowShort: true,
    },
    // {
    //   name: "IsActive",
    //   fieldName: "isActive",
    //   colType: GridColumnType.CHECKBOX,
    //   colSettings: {
    //     valueField: "isActive",
    //     getLableClass: (value) => {
    //       switch (value) {
    //         case true:
    //           return "info";
    //         case false:
    //           return "danger";
    //         default:
    //           return "secondary";
    //       }
    //     },
    //   },
    // },
    // {
    //   name: "Action",
    //   colType: GridColumnType.ACTION,
    //   defaultAction: {
    //     allowEdit: true,
    //     allowDelete: true,
    //   },

    // },
  ],

};

export const ApprovedCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "Tax Id",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Web Site",
      fieldName: "firstName",
      // allowShort: true,
    },
    // {
    //   name: "IsActive",
    //   fieldName: "isActive",
    //   colType: GridColumnType.CHECKBOX,
    //   colSettings: {
    //     valueField: "isActive",
    //     getLableClass: (value) => {
    //       switch (value) {
    //         case true:
    //           return "info";
    //         case false:
    //           return "danger";
    //         default:
    //           return "secondary";
    //       }
    //     },
    //   },
    // },
    // {
    //   name: "Action",
    //   colType: GridColumnType.ACTION,
    //   defaultAction: {
    //     allowEdit: true,
    //     allowDelete: true,
    //   },
    // },
  ],
};

export const AllInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "Reason",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Data",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: (value) => {
          switch (value) {
            case "Active":
              return "badge-gradient-success";
            case "Open":
              return "badge-gradient-info";
            case "In Active":
              return "badge-gradient-danger";
            case "Pending":
              return "badge-gradient-warning";

            case "In progress":
              return "badge-gradient-theme";

            default:
              return "badge-gradient-info";
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
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "Reason",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Data",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: (value) => {
          switch (value) {
            case "Active":
              return "badge-gradient-success";
            case "Open":
              return "badge-gradient-info";
            case "In Active":
              return "badge-gradient-danger";
            case "Pending":
              return "badge-gradient-warning";

            case "In progress":
              return "badge-gradient-theme";

            default:
              return "badge-gradient-info";
          }
        },
      },
    },
  ],
};

export const BlockedInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "Reason",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Data",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: (value) => {
          switch (value) {
            case "Active":
              return "badge-gradient-success";
            case "Open":
              return "badge-gradient-info";
            case "In Active":
              return "badge-gradient-danger";
            case "Pending":
              return "badge-gradient-warning";

            case "In progress":
              return "badge-gradient-theme";

            default:
              return "badge-gradient-info";
          }
        },
      },
    },
  ],
};

export const DisabledInActiveCustomerGridConfig = {
  columns: [
    {
      name: "Customer Name",
      fieldName: "userName",
      // allowShort: true,
    },
    {
      name: "Reason",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Data",
      fieldName: "firstName",
      // allowShort: true,
    },
    {
      name: "Status",
      fieldName: "status",
      allowShort: false,
      colType: GridColumnType.LABLE,
      colSettings: {
        valueField: "status",
        getLableClass: (value) => {
          switch (value) {
            case "Active":
              return "badge-gradient-success";
            case "Open":
              return "badge-gradient-info";
            case "In Active":
              return "badge-gradient-danger";
            case "Pending":
              return "badge-gradient-warning";

            case "In progress":
              return "badge-gradient-theme";

            default:
              return "badge-gradient-info";
          }
        },
      },
    },
  ],
};
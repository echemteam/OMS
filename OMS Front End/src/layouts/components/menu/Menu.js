import { securityKey } from "../../../data/SecurityKey";

export const Menu = [
  {
    groupLabel: "Main",
    items: [
      {
        name: "Dashboard",
        id: "Dashboard",
        to: "/",
        iconClass: "ri:home-3-line",
        subMenu: false,
        securityKey: securityKey.DASHBOARD,
        children: [],
      },


      {
        name: "Organization",
        id: "Organization",
        to: "/Organization",
        iconClass: "solar:buildings-2-outline",
        subMenu: false,
        securityKey: securityKey.DASHBOARD,
        children: [],
      },
    ],
  },
  {
    groupLabel: "Management",
    items: [
      {
        id: "Security",
        name: "Security",
        iconClass: "mdi:security-lock-outline",
        subMenu: true,
        to: "#",
        securityKey: securityKey.SECURITY,
        children: [
          {
            id: "User Management",
            submenuName: "User Management",
            to: "/Users",
            securityKey: securityKey.USERMANAGEMENT,
          },
          {
            id: "SecurityRoleManagement",
            submenuName: "Security Roles Management",
            to: "/SecurityRoleManagement",
            securityKey: securityKey.SECURITYROLEMANAGEMENT,
          },
        ],
      },
      {
        id: "customer",
        name: "Customer Details",
        iconClass: "vaadin:clipboard-user",
        subMenu: true,
        to: "#",
        securityKey: securityKey.CUSTOMER,
        children: [
          {
            id: "addCustomer",
            submenuName: "Add Customer",
            to: "/addCustomer",
            securityKey: securityKey.ADDCUSTOMER,
          },
          {
            id: "Customers",
            submenuName: "Customer",
            to: "/Customers",
            securityKey: securityKey.CUSTOMERLIST,
          },
        ],
      },
      {
        id: "supplier",
        name: "Supplier Details",
        iconClass: "streamline:shipping-truck",
        subMenu: true,
        to: "#",
        securityKey: securityKey.SUPPLIER,
        children: [
          {
            id: "addSupplier",
            submenuName: "Add Supplier",
            to: "/addSupplier",
            securityKey: securityKey.ADDSUPPLIER,
          },
          {
            id: "Suppliers",
            submenuName: "Supplier",
            to: "/Suppliers",
            securityKey: securityKey.SUPPLIERLIST,
          },
        ],
      },
      {
        id: "configuration",
        name: "Configuration",
        iconClass: "solar:settings-broken",
        subMenu: true,
        to: "#",
        securityKey: securityKey.CONFIGURATION,
        children: [
          {
            id: "approvalRules",
            submenuName: "Approval Rules",
            to: "/ApprovalRules",
            securityKey: securityKey.APPROVALRULES,
          },
          {
            id: "functionalConfiguration",
            submenuName: "Functional Configuration",
            to: "/FunctionalConfiguration",
            securityKey: securityKey.APPROVALRULES,
          },
          {
            id: "apiProviders",
            submenuName: "API Providers",
            to: "/APIProviders",
            securityKey: securityKey.APIPROVIDERS,
          },
          {
            id: "Api Configuration",
            submenuName: "Third party API",
            to: "/ThirdPartyApiConfiguration",
            securityKey: securityKey.USERMANAGEMENT,
          },
        ],
      },
      // {
      //   id: "apiconfiguration",
      //   name: "API Configuration",
      //   iconClass: "hugeicons:api",
      //   subMenu: true,
      //   to: "#",
      //   securityKey: securityKey.APICONFIGURATION,
      //   children: [
      //     {
      //       id: "apiProviders",
      //       submenuName: "API Providers",
      //       to: "/APIProviders",
      //       securityKey: securityKey.APIPROVIDERS,
      //     },
      //   ],
      // },
      // {
      //   id: "ThirdPartyAPI",
      //   name: "Third party API",
      //   iconClass: "hugeicons:api",
      //   subMenu: true,
      //   to: "#",
      //   securityKey: securityKey.SECURITY,
      //   children: [
      //     {
      //       id: "Api Configuration",
      //       submenuName: "Api Configuration",
      //       to: "/ThirdPartyApiConfiguration",
      //       securityKey: securityKey.USERMANAGEMENT,
      //     },
      //   ],
      // },
    ],
  },
  {
    groupLabel: "Orders",
    items: [
      {
        name: "Order",
        id: "Order",
        to: "/Order",
        iconClass: "lets-icons:order",
        subMenu: false,
        securityKey: securityKey.USERMANAGEMENT,
        children: [],
      },
      {
        name: "My Task",
        id: "MyTask",
        to: "/MyTask",
        iconClass: "octicon:tasklist-24",
        subMenu: false,
        securityKey: securityKey.DASHBOARD,
        children: []
      }
    ]
  },
];

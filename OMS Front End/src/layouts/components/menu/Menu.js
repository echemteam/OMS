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
        securityKey: securityKey.ORGANIZATION,
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
      }
    ],
  },

  {
    groupLabel: "Orders",
    items: [

      {
        name: "Order Details",
        id: "Order",
        to: "#",
        iconClass: "lets-icons:order",
        subMenu: true,
        securityKey: securityKey.ORDER,
        children: [
          {
            id: "addOrder",
            submenuName: "Add Order",
            to: "/addOrder",
            securityKey: securityKey.ORDER,
          },
          {
            id: "Suppliers",
            submenuName: "Order",
            to: "/Orders",
            securityKey: securityKey.ORDER,
          },
        ],
      },
      {
        name: "My Task",
        id: "MyTask",
        to: "/MyTask",
        iconClass: "octicon:tasklist-24",
        subMenu: false,
        securityKey: securityKey.MYTASK,
        children: []
      }
    ]
  },
];


export const ConfigurationMenu = [
  {
    groupLabel: "System Configurations",
    items: [
      {
        id: "approvalRules",
        to: "/configuration/ApprovalRules",
        securityKey: securityKey.APPROVALRULES,
        name: "Approval Rules",
        iconClass: "hugeicons:validation-approval",
        subMenu: false,
        children: []
      },
      {
        id: "functionalConfiguration",
        to: "/configuration/FunctionalConfiguration",
        securityKey: securityKey.FUNCTIONALCONFIGURATION,
        name: "Functional Configuration",
        iconClass: "solar:settings-broken",
        subMenu: false,
        children: []
      },
      {
        id: "apiProviders",
        to: "/configuration/APIProviders",
        securityKey: securityKey.APIPROVIDERS,
        name: "API Providers",
        iconClass: "icon-park-outline:api",
        subMenu: false,
        children: []
      },
      {
        id: "Api Configuration",
        to: "/configuration/ThirdPartyApiConfiguration",
        securityKey: securityKey.THIRDPARTYAPI,
        name: "Third party API",
        iconClass: "hugeicons:api",
        subMenu: false,
        children: []
      },
      {
        id: "Dictionary",
        to: "/configuration/Dictionary",
        securityKey: securityKey.DICTIONARY,
        name: "Dictionary",
        iconClass: "streamline:dictionary-language-book",
        subMenu: false,
        children: []
      },
      {
        id: "Email Template",
        to: "/configuration/EmailTemplate",
        securityKey: securityKey.DICTIONARY,
        name: "Email Template",
        iconClass: "eos-icons:templates-outlined",
        subMenu: false,
        children: []
      }
    ]
  }
];

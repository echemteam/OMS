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
    ],
  },
  {
    groupLabel: "Administration ",
    items: [
      {
        name: "Organization",
        id: "Organization",
        to: "/Organization",
        iconClass: "solar:buildings-2-outline",
        subMenu: false,
        securityKey: securityKey.ORGANIZATION,
        children: [],
      },
      {
        name: "User Management",
        id: "User Management",
        to: "/Users",
        iconClass: "mdi:account-group-outline",
        securityKey: securityKey.USERMANAGEMENT,
      },
      {
        name: "Role Management",
        id: "SecurityRoleManagement",
        submenuName: "Role Management",
        iconClass: "mdi:shield-account-outline",
        to: "/SecurityRoleManagement",
        securityKey: securityKey.SECURITYROLEMANAGEMENT,
      },
    ],
  },
  
  {
    groupLabel: "Management",
    items: [
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
            id: "definedOrders",
            submenuName: "Defined Order",
            to: "/definedOrders",
            securityKey: securityKey.ORDER,
          },
          // {
          //   id: "confirmedOrders",
          //   submenuName: "Confirmed Order",
          //   to: "/confirmedOrders",
          //   securityKey: securityKey.ORDER,
          // },
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
      },
      {
        id: "Snippet",
        to: "/configuration/Snippet",
        securityKey: securityKey.DICTIONARY,
        name: "Snippets",
        iconClass: "eos-icons:templates-outlined",
        subMenu: false,
        children: []
    }
    
    ]
  }
];
